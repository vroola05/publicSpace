package org.commonground.ps.backendapi.core;

import java.util.ArrayList;
import java.util.List;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.jpa.entities.PageButtonEntity;
import org.commonground.ps.backendapi.jpa.entities.PageButtonRolesEntity;
import org.commonground.ps.backendapi.jpa.entities.PageEntity;
import org.commonground.ps.backendapi.jpa.repositories.PageRepository;
import org.commonground.ps.backendapi.model.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PageServiceImpl implements PageService {

	@Autowired
	private PageRepository pageRepository;

	public List<Page> get(Long companyId, Long domainId) {
		List<Page> pages = new ArrayList<>();
		List<PageEntity> pageEntities = pageRepository.getPages(domainId);
		pageEntities.forEach(pageEntity -> {
			pages.add(Convert.pageEntity(pageEntity));
		});
		return pages;
	}

	
}
