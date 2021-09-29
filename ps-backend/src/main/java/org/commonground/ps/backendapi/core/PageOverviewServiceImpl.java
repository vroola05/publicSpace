package org.commonground.ps.backendapi.core;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.jpa.entities.PageEntity;
import org.commonground.ps.backendapi.jpa.entities.PageOverviewColumnEntity;
import org.commonground.ps.backendapi.jpa.entities.PageOverviewEntity;
import org.commonground.ps.backendapi.model.Page;
import org.commonground.ps.backendapi.model.PageOverviewColumn;
import org.commonground.ps.backendapi.model.PageOverviewImpl;
import org.commonground.ps.backendapi.model.PageOverviewTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PageOverviewServiceImpl implements PageOverviewService {

	@Autowired
	private StatusService statusService;

	@Override
	public void updatePageOverviewPages(Long domainId, Page page, PageEntity pageEntity) {
		PageOverviewImpl pageOverview = (PageOverviewImpl) page;
		List<PageOverviewTemplate> pageOverviewTemplates = pageOverview.getPageOverviewTemplate();
		List<PageOverviewEntity> pageOverviewEntities = pageEntity.getPageOverview();

		long i = 0;
		for (PageOverviewTemplate pageOverviewTemplate : pageOverviewTemplates) {
			Optional<PageOverviewEntity> pageOverviewEntityOptional = pageOverviewEntities.stream()
					.filter(c -> c.getId() == pageOverviewTemplate.getId()).findFirst();
			if (pageOverviewTemplate.getId() != null && pageOverviewEntityOptional.isPresent()) {
				// Update
				PageOverviewEntity pageOverviewEntity = pageOverviewEntityOptional.get();
				updatePageOverviewPage(domainId, i, pageOverviewTemplate, pageOverviewEntity);
			} else {
				// Insert
				PageOverviewEntity pageOverviewEntity = new PageOverviewEntity();
				pageOverviewEntity.setPage(pageEntity);
				updatePageOverviewPage(domainId, i, pageOverviewTemplate, pageOverviewEntity);
				pageOverviewEntities.add(pageOverviewEntity);
			}
			i++;
		}

		// Remove
		pageOverviewEntities.removeIf(pageOverviewEntity -> pageOverviewTemplates.stream()
				.noneMatch(p -> p.getId() == pageOverviewEntity.getId()));

	}

	public void updatePageOverviewPage(Long domainId, long sort, PageOverviewTemplate pageOverviewTemplate, PageOverviewEntity pageOverviewEntity) {
		pageOverviewEntity.setId(pageOverviewTemplate.getId());
		pageOverviewEntity.setName(pageOverviewTemplate.getName());
		pageOverviewEntity.setIcon(pageOverviewTemplate.getIcon());
		pageOverviewEntity.setRoute(pageOverviewTemplate.getRoute());
		pageOverviewEntity.setPriority(pageOverviewTemplate.isPriority());
		pageOverviewEntity.setToggle(pageOverviewTemplate.isToggle());
		pageOverviewEntity.setPersonal(pageOverviewTemplate.isPersonal());
		pageOverviewEntity.setSort(sort);
		
		statusService.convertPageOverviewStatusses(domainId, pageOverviewTemplate, pageOverviewEntity);

		List<PageOverviewColumnEntity> pageOverviewColumnEntities = pageOverviewEntity.getColumns();

		long i = 0;
		for (PageOverviewColumn pageOverviewColumn : pageOverviewTemplate.getColumns()) {
			Optional<PageOverviewColumnEntity> pageOverviewColumnEntityOptional = pageOverviewColumnEntities.stream()
					.filter(p -> p.getId() == pageOverviewColumn.getId()).findFirst();

			if (pageOverviewColumn.getId() != null && pageOverviewColumnEntityOptional.isPresent()) {
				// Update
				PageOverviewColumnEntity pageOverviewColumnEntity = pageOverviewColumnEntityOptional.get();
				updatePageOverviewColumn(i, pageOverviewColumn, pageOverviewColumnEntity);
			} else {
				// Insert
				PageOverviewColumnEntity pageOverviewColumnEntity = new PageOverviewColumnEntity();
				pageOverviewColumnEntity.setPageOverview(pageOverviewEntity);
				updatePageOverviewColumn(i, pageOverviewColumn, pageOverviewColumnEntity);
				pageOverviewColumnEntities.add(pageOverviewColumnEntity);
			}
			i++;
		}

		// Remove
		pageOverviewColumnEntities.removeIf(pageOverviewColumnEntity -> pageOverviewTemplate.getColumns().stream()
				.noneMatch(p -> p.getId() == pageOverviewColumnEntity.getId()));
	}

	public void updatePageOverviewColumn(long sort, PageOverviewColumn pageOverviewColumn, PageOverviewColumnEntity pageOverviewColumnEntity) {
		pageOverviewColumnEntity.setId(pageOverviewColumn.getId());
		pageOverviewColumnEntity.setName(pageOverviewColumn.getName());
		pageOverviewColumnEntity.setTitle(pageOverviewColumn.getTitle());
		pageOverviewColumnEntity.setType(pageOverviewColumn.getType());
		pageOverviewColumnEntity.setFilter(pageOverviewColumn.getFilter());
		pageOverviewColumnEntity.setCss(pageOverviewColumn.getCss());
		pageOverviewColumnEntity.setMobile(pageOverviewColumn.getMobile());
		pageOverviewColumnEntity.setSort(sort);
	}
}
