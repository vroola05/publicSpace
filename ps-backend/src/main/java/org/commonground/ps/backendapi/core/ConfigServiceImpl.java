package org.commonground.ps.backendapi.core;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.jpa.repositories.DomainRepository;
import org.commonground.ps.backendapi.jpa.repositories.StatusRepository;
import org.commonground.ps.backendapi.model.Status;
import org.commonground.ps.backendapi.model.template.DomainT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfigServiceImpl implements ConfigService {
  private static HashMap<String, DomainT> configs = new HashMap<>();;

  @Autowired
	private DomainRepository domainRepository;

  @Autowired
	private StatusRepository statusRepository;

  public DomainT get(String domain) throws SecurityException {
    if(!ConfigService.isValidDomain(domain)) {
      throw new SecurityException("Not a valid domain.");
    }

    DomainT domainT = configs.get(domain);
    if (domainT != null) {
      return domainT;
    }
    return getFromStore(domain);
  }

  private DomainT getFromStore(String domain) throws SecurityException {
    String file = "/configs/" + domain.replaceAll("/", "-") + ".json";
    ObjectMapper mapper = new ObjectMapper();
    TypeReference<DomainT> typeReference = new TypeReference<DomainT>() {
    };

    try {
      if (TypeReference.class.getResource(file) != null) {
        InputStream inputStream = TypeReference.class.getResourceAsStream(file);
        DomainT domainT = mapper.readValue(inputStream, typeReference);

        Optional<DomainEntity> domainEntity = domainRepository.getDomainByDomain(domain);
        if (domainEntity.isPresent()) {
          List<StatusEntity> statusEntities = statusRepository.getStatusByDomainId(domainEntity.get().getId());
          List<Status> statusses = new ArrayList<>();
          statusEntities.forEach(statusEntity -> {
            statusses.add(Convert.statusEntity(statusEntity));
          });
          domainT.getInfo().setStatus(statusses);
        }
        
        //
        configs.put(domain, domainT);
        return domainT;
      }
    } catch (IOException e) {
      throw new SecurityException("Error reading");
    }
    throw new SecurityException("Not found");
  }

  public boolean checkUserDomain(String domain, String referer) {
    if(referer.length() < domain.length()) {
      return false;
    }
    int domainSize = domain.length();
    if (referer.length() > domainSize ) {
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
}
