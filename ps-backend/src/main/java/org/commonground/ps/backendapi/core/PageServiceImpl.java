package org.commonground.ps.backendapi.core;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.convertor.Convert;
import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.PageEntity;
import org.commonground.ps.backendapi.jpa.repositories.PageRepository;
import org.commonground.ps.backendapi.model.Page;
import org.commonground.ps.backendapi.model.enums.PageTypesEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PageServiceImpl implements PageService {

	@Autowired
	private PageRepository pageRepository;

	@Autowired
	private PageButtonService pageButtonService;

	@Autowired
	private PageOverviewService pageOverviewService;

	public List<Page> get(Long companyId, Long domainId) {
		List<Page> pages = new ArrayList<>();
		List<PageEntity> pageEntities = pageRepository.getPages(domainId);
		pageEntities.forEach(pageEntity -> {
			pages.add(Convert.pageEntity(pageEntity));
		});
		return pages;
	}

	public Page updatePage(Long domainId, Long pageId, Page page) throws BadRequestException {
		Optional<PageEntity> optionalPageEntity = pageRepository.getPageById(pageId, domainId);
		if (optionalPageEntity.isPresent()) {
			PageEntity pageEntity = optionalPageEntity.get();
			pageEntity.setName(page.getName());
			pageEntity.setLayoutType(page.getLayoutType());

			if (pageEntity.getPageType().getName().equalsIgnoreCase(PageTypesEnum.OVERVIEW.name)) {
				pageOverviewService.updatePageOverviewPages(domainId, page, pageEntity);
			} else {
				// Remove page buttons
				pageEntity.getPageButtons()
					.removeIf(pageButtonEntity -> 
						page.getButtonsLeft().stream().noneMatch(a -> a.getId() == pageButtonEntity.getId())
						&& page.getButtonsRight().stream().noneMatch(a -> a.getId() == pageButtonEntity.getId())
					);

				pageButtonService.updatePageButtons("left", pageEntity, page.getButtonsLeft());
				pageButtonService.updatePageButtons("right", pageEntity, page.getButtonsRight());
			}

			return Convert.pageEntity(pageRepository.saveAndFlush(pageEntity));
		}

		throw new BadRequestException();
	}
}
