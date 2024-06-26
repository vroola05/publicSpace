package org.commonground.ps.backendapi.core;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.StatusRepository;
import org.commonground.ps.backendapi.model.Page;
import org.commonground.ps.backendapi.model.Status;
import org.commonground.ps.backendapi.model.template.Template;
import org.springframework.stereotype.Service;

@Service
public class ConfigServiceImpl implements ConfigService {
  private static HashMap<String, Template> configs = new HashMap<>();

  private final DomainRepository domainRepository;
  private final StatusRepository statusRepository;
  private final PageService pageService;
  private final ActionService actionService;

  public ConfigServiceImpl(
      ActionService actionService,
      DomainRepository domainRepository,
      PageService pageService,
      StatusRepository statusRepository) {
    this.domainRepository = domainRepository;
    this.statusRepository = statusRepository;
    this.pageService = pageService;
    this.actionService = actionService;

  }

  @Override
  public Template find(String referer) throws SecurityException {
    try {
      URI url = new URI(referer);
      List<DomainEntity> domains = domainRepository.getDomainsByStartsWithDomain(url.getHost());
      for (DomainEntity domainEntity : domains) {
        if (checkUserDomain(domainEntity.getDomain(), url.getHost() + url.getPath())) {
          return get(domainEntity.getDomain());
        }
      }
    } catch (URISyntaxException e) {
      throw new SecurityException("Not a valid referer.");
    }
    throw new SecurityException("Not a valid domain.");
  }

  @Override
  public Template get(String domain) throws SecurityException {
    if (!ConfigService.isValidDomain(domain)) {
      throw new SecurityException("Not a valid domain.");
    }

    Template template = configs.get(domain);
    if (template != null) {
      return template;
    }
    return getFromStore(domain);
  }

  @Override
  public void update(String domain) throws SecurityException {
    getFromStore(domain);
  }

  private Template getFromStore(String domain) throws SecurityException {
    String file = "/configs/" + domain.replaceAll("/", "-") + ".json";
    ObjectMapper mapper = new ObjectMapper();
    TypeReference<Template> typeReference = new TypeReference<Template>() {
    };

    try {
      if (TypeReference.class.getResource(file) != null) {
        InputStream inputStream = TypeReference.class.getResourceAsStream(file);
        Template config = mapper.readValue(inputStream, typeReference);

        Optional<DomainEntity> domainEntity = domainRepository.getDomainByDomain(domain);
        if (domainEntity.isPresent()) {
          Long companyId = domainEntity.get().getCompany().getId();

          Long domainId = domainEntity.get().getId();
          config.getInfo().setCompany(companyId);
          config.getInfo().setDomain(domainId);
          config.setCompany(Convert.companyEntity(domainEntity.get().getCompany()));
          config.setDomain(Convert.domainEntity(domainEntity.get()));
          List<StatusEntity> statusEntities = statusRepository.getStatusByDomainId(domainId);
          List<Status> statusses = new ArrayList<>();
          statusEntities.forEach(statusEntity -> statusses.add(Convert.statusEntity(statusEntity)));
          config.getInfo().setStatus(statusses);

          config.setActions(actionService.getActionByDomainId(domainId));

          config.setPages(getPages(companyId, domainId));
        }

        configs.put(domain, config);
        return config;
      }
    } catch (IOException e) {
      throw new SecurityException("Error reading");
    }
    throw new SecurityException("Not found");
  }

  public boolean checkUserDomain(String domain, String referer) {
    if (referer.length() < domain.length()) {
      return false;
    }
    int domainSize = domain.length();
    if (referer.length() > domainSize) {
      int index = referer.indexOf("/", domainSize - 1);
      ////////////////
      // if domain is "bla.nl/ap" and referer "bla.nl/ap_LONGSTRING/path"
      // return false
      ////////////////
      if (index != domainSize) {
        return false;
      }
      return referer.substring(0, index).equalsIgnoreCase(domain);
    }
    return referer.equalsIgnoreCase(domain);
  }

  public Map<String, Page> getPages(Long companyId, Long domainId) {
    Map<String, Page> pages = new HashMap<>();
    List<Page> pagesList = pageService.get(companyId, domainId);

    pagesList.forEach(page -> pages.put(page.getPageType().getName(), page));
    return pages;
  }
}
