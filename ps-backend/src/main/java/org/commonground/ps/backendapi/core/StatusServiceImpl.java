package org.commonground.ps.backendapi.core;

import java.util.List;
import java.util.Optional;

import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.PageOverviewEntity;
import org.commonground.ps.backendapi.jpa.entities.PageOverviewStatusEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.jpa.repositories.StatusRepository;
import org.commonground.ps.backendapi.model.PageOverviewTemplate;
import org.commonground.ps.backendapi.model.Status;
import org.springframework.stereotype.Service;

@Service
public class StatusServiceImpl implements StatusService {
	private final StatusRepository statusRepository;

	public StatusServiceImpl(StatusRepository statusRepository) {
		this.statusRepository = statusRepository;

	}

	public List<StatusEntity> getStatus(Long domainId) {
		return statusRepository.getStatusByDomainId(domainId);
	}

	@Override
	public void convertPageOverviewStatusses(Long domainId, PageOverviewTemplate pageOverviewTemplate, PageOverviewEntity pageOverviewEntity)
			throws BadRequestException {
				List<StatusEntity> statusEntities = getStatus(domainId);
				List<Status> statusses = pageOverviewTemplate.getStatusses();
				for (Status status : statusses) {
					if (pageOverviewEntity.getStatusses().stream().noneMatch(s -> s.getStatus().getId() == status.getId())) {
						// Insert
						PageOverviewStatusEntity pageOverviewStatusEntity = new PageOverviewStatusEntity();
						pageOverviewStatusEntity.setPageOverview(pageOverviewEntity);
						
						Optional<StatusEntity> statusEntityOptional = statusEntities.stream().filter(s -> s.getId() == status.getId()).findFirst();
						if (statusEntityOptional.isPresent()) {
							pageOverviewStatusEntity.setStatus(statusEntityOptional.get());
						} else {
							throw new BadRequestException();
						}
						pageOverviewEntity.getStatusses().add(pageOverviewStatusEntity);
					}
				}

				// Remove
				pageOverviewEntity.getStatusses()
					.removeIf(pageOverviewStatusEntity -> 
						statusses.stream().noneMatch(role -> role.getId() == pageOverviewStatusEntity.getStatus().getId()));
		
	}

}
