package org.commonground.ps.backendapi.convertor;

import java.util.ArrayList;
import java.util.List;

import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.CategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.CompanyEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractSpecificationEntity;
import org.commonground.ps.backendapi.jpa.entities.ContractSpecificationItemEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.GeoAddressEntity;
import org.commonground.ps.backendapi.jpa.entities.GroupEntity;
import org.commonground.ps.backendapi.jpa.entities.LocationEntity;
import org.commonground.ps.backendapi.jpa.entities.MainCategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.NoteEntity;
import org.commonground.ps.backendapi.jpa.entities.NoteTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderCategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderNoteEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderSpecificationItemEntity;
import org.commonground.ps.backendapi.jpa.entities.PageButtonConditionEntity;
import org.commonground.ps.backendapi.jpa.entities.PageButtonEntity;
import org.commonground.ps.backendapi.jpa.entities.PageButtonRolesEntity;
import org.commonground.ps.backendapi.jpa.entities.PageEntity;
import org.commonground.ps.backendapi.jpa.entities.PageOverviewColumnEntity;
import org.commonground.ps.backendapi.jpa.entities.PageOverviewEntity;
import org.commonground.ps.backendapi.jpa.entities.PageOverviewStatusEntity;
import org.commonground.ps.backendapi.jpa.entities.PageTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.PersonEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.model.Action;
import org.commonground.ps.backendapi.model.ActionType;
import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.Category;
import org.commonground.ps.backendapi.model.Company;
import org.commonground.ps.backendapi.model.Contract;
import org.commonground.ps.backendapi.model.ContractSpecification;
import org.commonground.ps.backendapi.model.ContractSpecificationItem;
import org.commonground.ps.backendapi.model.Domain;
import org.commonground.ps.backendapi.model.DomainType;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.model.Location;
import org.commonground.ps.backendapi.model.MainCategory;
import org.commonground.ps.backendapi.model.Note;
import org.commonground.ps.backendapi.model.NoteType;
import org.commonground.ps.backendapi.model.Order;
import org.commonground.ps.backendapi.model.OrderNote;
import org.commonground.ps.backendapi.model.OrderSpecificationItem;
import org.commonground.ps.backendapi.model.Page;
import org.commonground.ps.backendapi.model.PageButton;
import org.commonground.ps.backendapi.model.PageButtonCondition;
import org.commonground.ps.backendapi.model.PageImpl;
import org.commonground.ps.backendapi.model.PageOverviewColumn;
import org.commonground.ps.backendapi.model.PageOverviewImpl;
import org.commonground.ps.backendapi.model.PageOverviewTemplate;
import org.commonground.ps.backendapi.model.PageType;
import org.commonground.ps.backendapi.model.Person;
import org.commonground.ps.backendapi.model.Role;
import org.commonground.ps.backendapi.model.Status;
import org.commonground.ps.backendapi.model.User;
import org.commonground.ps.backendapi.model.enums.DomainTypeEnum;
import org.commonground.ps.backendapi.model.enums.PageTypesEnum;

public class Convert {
  
  private Convert() {}

  public static User userEntity(UserEntity userEntity) {
    User user = new User();
    user.setId(userEntity.getId());
    user.setName(userEntity.getName());
    user.setUsername(userEntity.getUsername());
    user.setEmail(userEntity.getEmail());
    user.setAdmin(userEntity.isAdmin());

    List<String> roles = new ArrayList<>();
    userEntity.getRoles().forEach(role -> roles.add(role.getName()));
    user.setRoles(roles);

    List<Group> groups = new ArrayList<>();
    userEntity.getGroups().forEach(group -> groups.add(new Group(group.getId(), group.getName())));
    user.setGroups(groups);

    user.setDomain(domainEntity(userEntity.getDomain()));

    user.setCompany(companyEntity(userEntity.getDomain().getCompany()));

    return user;
  }

  public static UserEntity user(User user) {
    UserEntity userEntity = new UserEntity();
    userEntity.setId(user.getId());
    userEntity.setName(user.getName());
    userEntity.setUsername(user.getUsername());
    userEntity.setEmail(user.getEmail());

    return userEntity;
  }

  public static Domain domainEntity(DomainEntity domainEntity) {
		return new Domain(domainEntity.getId(), domainEntity.getName(), domainEntity.getDomain(), domainTypeEntity(domainEntity.getDomainType()));
	}

  public static DomainEntity domain(Domain domain) {
    DomainEntity domainEntity = new DomainEntity();
    domainEntity.setId(domain.getId());
    domainEntity.setName(domain.getName());
    domainEntity.setDomain(domain.getDomain());
		return domainEntity;
	}

  public static DomainType domainTypeEntity(DomainTypeEntity domainTypeEntity) {
		return new DomainType(domainTypeEntity.getId(), domainTypeEntity.getName());
	}
  

  public static Company companyEntity(CompanyEntity companyEntity) {
    Company company = new Company();
    company.setId(companyEntity.getId());
    company.setName(companyEntity.getName());
    company.setCode(companyEntity.getCode());
    company.setSrid(companyEntity.getSrid());

    if (companyEntity.getCenter() != null && companyEntity.getCenter().getCoordinate() != null) {
      company.setX(companyEntity.getCenter().getCoordinate().x);
      company.setY(companyEntity.getCenter().getCoordinate().y);
    }
    
    
		return company;
	}

  public static CompanyEntity company(Company company) {
		CompanyEntity companyEntity = new CompanyEntity();
		companyEntity.setId(company.getId());
		companyEntity.setName(company.getName());
    return companyEntity;
	}

  public static Group groupEntity(GroupEntity groupEntity) {
		return new Group(groupEntity.getId(), groupEntity.getName());
	}

  public static GroupEntity group(Group group) {
    GroupEntity groupEntity = new GroupEntity();
    groupEntity.setId(group.getId());
    groupEntity.setName(group.getName());
		return groupEntity;
	}

  public static MainCategory mainCategoryEntity(MainCategoryEntity mainCategoryEntity) {
		return new MainCategory(mainCategoryEntity.getId(), mainCategoryEntity.getName());
	}

  public static MainCategoryEntity mainCategory(MainCategory mainCategory) {
    MainCategoryEntity mainCategoryEntity = new MainCategoryEntity();
    mainCategoryEntity.setId(mainCategory.getId());
    mainCategoryEntity.setName(mainCategory.getName());
		return mainCategoryEntity;
	}

  public static CategoryEntity category(Category category) {
    CategoryEntity categoryEntity = new CategoryEntity();
    categoryEntity.setId(category.getId());
    categoryEntity.setName(category.getName());
    categoryEntity.setStartDate(category.getStartDate());
    categoryEntity.setEndDate(category.getEndDate());
    categoryEntity.setActive(category.getActive());
		return categoryEntity;
	}

  public static Category categoryEntity(CategoryEntity categoryEntity) {
    Category category = new Category();
    category.setId(categoryEntity.getId());
    category.setName(categoryEntity.getName());
		return category;
	}

  public static CallEntity call(Call call) {
    CallEntity callEntity = new CallEntity();
    callEntity.setId(call.getId());
    callEntity.setCasenumber(call.getCasenumber());
    callEntity.setDescription(call.getDescription());
    callEntity.setDateCreated(call.getDateCreated());
    callEntity.setDateEnded(call.getDateEnded());

    return callEntity;
  }

  public static Call callEntity(CallEntity callEntity, User user) {
    Call call = new Call();
    call.setId(callEntity.getId());
    call.setCasenumber(callEntity.getCasenumber());
    call.setDescription(callEntity.getDescription());
    call.setDateCreated(callEntity.getDateCreated());
    call.setDateEnded(callEntity.getDateEnded());

    if (callEntity.getLocation() != null) {
			call.setLocation(locationEntity(callEntity.getLocation()));
		}

    if (user.getDomain().getDomainType().getId() == DomainTypeEnum.GOVERNMENT.id && callEntity.getPerson() != null) {
        call.setPerson(personEntity(callEntity.getPerson()));
    }		
		
		if (callEntity.getUser() != null) {
			call.setUser(userEntity(callEntity.getUser()));
		}

		if (callEntity.getGroup() != null) {
			call.setGroup(groupEntity(callEntity.getGroup()));
		}

		if (callEntity.getCategory() != null) {
			call.setMainCategory(mainCategoryEntity(callEntity.getCategory().getMainCategory()));
			call.getMainCategory().setCategory(categoryEntity(callEntity.getCategory()));
		}

		if (callEntity.getStatus() != null) {
			call.setStatus(statusEntity(callEntity.getStatus()));
		}

    if (user.getDomain().getDomainType().getId() == DomainTypeEnum.GOVERNMENT.id) {
      if (callEntity.getOrders() != null && !callEntity.getOrders().isEmpty()) {
        for (OrderEntity orderEntity: callEntity.getOrders()) {
          call.getOrders().add(orderEntity(orderEntity, user.getDomain().getDomainType()));
        }
      }

      for (NoteEntity noteEntity : callEntity.getNotes()) {
        call.getNotes().add(noteEntity(noteEntity));
      }
    }

		call.setDomain(domainEntity(callEntity.getDomain()));    
    return call;
  }

  public static LocationEntity location(Location location) {
    LocationEntity locationEntity = new LocationEntity();
    locationEntity.setStreet(location.getStreet());
    locationEntity.setNumber(location.getNumber());
    locationEntity.setPostal(location.getPostal());
    locationEntity.setCity(location.getCity());
    locationEntity.setX(location.getX());
    locationEntity.setY(location.getY());
    return locationEntity;
  }

  public static Location locationEntity(LocationEntity locationEntity) {
    Location location = new Location();
    location.setStreet(locationEntity.getStreet());
    location.setNumber(locationEntity.getNumber());
    location.setPostal(locationEntity.getPostal());
    location.setCity(locationEntity.getCity());
    location.setX(locationEntity.getX());
    location.setY(locationEntity.getY());
    return location;
  }

  public static PersonEntity person(Person person) {
    PersonEntity personEntity = new PersonEntity();
    personEntity.setName(person.getName());
    personEntity.setEmail(person.getEmail());
    personEntity.setPhone(person.getPhone());

    personEntity.setStreet(person.getStreet());
    personEntity.setNumber(person.getNumber());
    personEntity.setLetter(person.getLetter());
    personEntity.setPostal(person.getPostal());
    personEntity.setCity(person.getCity());
    return personEntity;
  }

  public static Person personEntity(PersonEntity personEntity) {
    Person person = new Person();
    person.setName(personEntity.getName());
    person.setEmail(personEntity.getEmail());
    person.setPhone(personEntity.getPhone());

    person.setStreet(personEntity.getStreet());
    person.setNumber(personEntity.getNumber());
    person.setLetter(personEntity.getLetter());
    person.setPostal(personEntity.getPostal());
    person.setCity(personEntity.getCity());
    return person;
  }

  public static Status statusEntity(StatusEntity statusEntity) {
    Status status = new Status();

    status.setId(statusEntity.getId());
    status.setName(statusEntity.getName());

    if (statusEntity.getActions() != null) {
      for (ActionEntity actionEntity: statusEntity.getActions()) {
        status.getActionTypes().add(actionTypeEntity(actionEntity.getActionType()));
      }
    }

    return status;
  }

  public static StatusEntity status(Status status) {
    StatusEntity statusEntity = new StatusEntity();

    statusEntity.setId(status.getId());
    statusEntity.setName(status.getName());

    return statusEntity;
  }

  public static ActionType actionTypeEntity(ActionTypeEntity actionTypeEntity) {
    ActionType actionType = new ActionType();

    actionType.setId(actionTypeEntity.getId());
    actionType.setName(actionTypeEntity.getName());

    return actionType;
  }

  public static ActionTypeEntity actionType(ActionType actionType) {
    ActionTypeEntity actionTypeEntity = new ActionTypeEntity();

    actionTypeEntity.setId(actionType.getId());
    actionTypeEntity.setName(actionType.getName());

    return actionTypeEntity;
  }


  public static Action actionEntity(ActionEntity actionEntity) {
    Action action = new Action();
    action.setId(actionEntity.getId());
    action.setActionType(Convert.actionTypeEntity(actionEntity.getActionType()));
    if (actionEntity.getStatus() != null) {
      action.setStatus(Convert.statusEntity(actionEntity.getStatus()));
    }
    return action;
  }

  public static ActionEntity action(Action actionType) {
    ActionEntity actionEntity = new ActionEntity();
    actionEntity.setId(actionType.getId());
    return actionEntity;
  }

  public static Page pageEntity(PageEntity pageEntity) {
    if (pageEntity.getPageType().getName().equalsIgnoreCase(PageTypesEnum.OVERVIEW.name)) {
      PageOverviewImpl page = new PageOverviewImpl();
      Convert.pageGenericEntity(pageEntity, page);

      List<PageOverviewEntity> pageOverviewEntities = pageEntity.getPageOverview();
      for (PageOverviewEntity pageOverviewEntity : pageOverviewEntities) {
        PageOverviewTemplate pageOverviewTemplate = new PageOverviewTemplate();
        pageOverviewTemplate.setId(pageOverviewEntity.getId());
        pageOverviewTemplate.setName(pageOverviewEntity.getName());
        pageOverviewTemplate.setIcon(pageOverviewEntity.getIcon());
        pageOverviewTemplate.setRoute(pageOverviewEntity.getRoute());
        pageOverviewTemplate.setToggle(pageOverviewEntity.getToggle());
        pageOverviewTemplate.setPriority(pageOverviewEntity.getPriority());
        pageOverviewTemplate.setPersonal(pageOverviewEntity.getPersonal());
        pageOverviewTemplate.setSize(pageOverviewEntity.getSize());
        List<PageOverviewColumn> columns = new ArrayList<>();
        
        List<Status> statusses = new ArrayList<>();
        List<PageOverviewStatusEntity> statusEntities = pageOverviewEntity.getStatusses();
        for (PageOverviewStatusEntity pageOverviewStatusEntity: statusEntities) {
          statusses.add(Convert.statusEntity(pageOverviewStatusEntity.getStatus()));
        }
        pageOverviewTemplate.setStatusses(statusses);

        List<PageOverviewColumnEntity> pageOverviewColumnEntities = pageOverviewEntity.getColumns();
        for (PageOverviewColumnEntity pageOverviewColumnEntity : pageOverviewColumnEntities) {
          PageOverviewColumn pageOverviewColumn = new PageOverviewColumn();
          pageOverviewColumn.setId(pageOverviewColumnEntity.getId());
          pageOverviewColumn.setName(pageOverviewColumnEntity.getName());
          pageOverviewColumn.setTitle(pageOverviewColumnEntity.getTitle());
          pageOverviewColumn.setType(pageOverviewColumnEntity.getType());
          pageOverviewColumn.setFilter(pageOverviewColumnEntity.getFilter());
          pageOverviewColumn.setMobile(pageOverviewColumnEntity.getMobile());
          pageOverviewColumn.setCss(pageOverviewColumnEntity.getCss());
          columns.add(pageOverviewColumn);
        }
        pageOverviewTemplate.setColumns(columns);

        List<PageButtonEntity> pageButtonEntities = pageOverviewEntity.getPageButtons();

        pageOverviewTemplate.setButtonsLeft(getButtonsLocation(pageButtonEntities, "left"));
        pageOverviewTemplate.setButtonsRight(getButtonsLocation(pageButtonEntities, "right"));

        page.getPageOverviewTemplate().add(pageOverviewTemplate);
      }
      


      return page;
    } else {
      PageImpl page = new PageImpl();
      Convert.pageGenericEntity(pageEntity, page);
      return page;
    }
  }

  public static Page pageGenericEntity(PageEntity pageEntity, Page page) {
    page.setId(pageEntity.getId());
    page.setName(pageEntity.getName());
    page.setLayoutType(pageEntity.getLayoutType());
    page.setPageType(Convert.pageTypeEntity(pageEntity.getPageType()));

    List<PageButtonEntity> pageButtonEntities = pageEntity.getPageButtons();
    page.setButtonsLeft(getButtonsLocation(pageButtonEntities, "left"));
    page.setButtonsRight(getButtonsLocation(pageButtonEntities, "right"));

    return page;
  }

  private static ArrayList<PageButton> getButtonsLocation(List<PageButtonEntity> pageButtonEntities, String location) {
		ArrayList<PageButton> pageButtons = new ArrayList<>();
		if (pageButtonEntities != null) {
			pageButtonEntities.forEach(pageButtonEntity -> {
				PageButton pageButton = Convert.pageButtonEntity(pageButtonEntity);
        ActionTypeEntity action = pageButtonEntity.getActionType();
        if (action != null) {
          pageButton.setAction(Convert.actionTypeEntity(pageButtonEntity.getActionType()));
        }
				if (pageButtonEntity.getLocation().equalsIgnoreCase(location)) {
					pageButtons.add(pageButton);
			
					List<PageButtonRolesEntity> roleEntities = pageButtonEntity.getRoles();
					List<Role> roles = new ArrayList<>();
					roleEntities.forEach(roleEntity -> {
						Role role = new Role();
						role.setRole(roleEntity.getRole().getName());
						role.setId(roleEntity.getRole().getId());
						role.setAllow(roleEntity.isAllow());
						roles.add(role);
					});
					pageButton.setRoles(roles);
					pageButton.setType(pageButtonEntity.getButtonType().getName());
				}

         List<PageButtonConditionEntity> conditionEntities = pageButtonEntity.getConditions();
					List<PageButtonCondition> conditions = new ArrayList<>();
					conditionEntities.forEach(conditionEntity -> {
						PageButtonCondition condition = new PageButtonCondition();
						condition.setId(conditionEntity.getId());
						condition.setField(conditionEntity.getField());
						condition.setOperator(conditionEntity.getOperator());
            condition.setValue(conditionEntity.getValue());
						conditions.add(condition);
					});
					pageButton.setConditions(conditions);
					pageButton.setType(pageButtonEntity.getButtonType().getName());
			});
		}
		return pageButtons;
	}

  public static PageEntity page(Page page) {
    PageEntity pageEntity = new PageEntity();
    pageEntity.setId(page.getId());
    pageEntity.setName(page.getName());
    
    return pageEntity;
  }

  public static PageType pageTypeEntity(PageTypeEntity pageTypeEntity) {
    PageType pageType = new PageType();
    pageType.setId(pageTypeEntity.getId());
    pageType.setName(pageTypeEntity.getName());
    
    return pageType;
  }

  public static PageButton pageButtonEntity(PageButtonEntity pageButtonEntity) {
    PageButton pageButton = new PageButton();
    pageButton.setId(pageButtonEntity.getId());
    pageButton.setName(pageButtonEntity.getName());
    pageButton.setRoute(pageButtonEntity.getRoute());
    return pageButton;
  }
  
  public static Location toLocation(GeoAddressEntity geoAddressEntity) {
		Location location = new Location();
    location.setStreet(geoAddressEntity.getStreet());
    location.setNumber(Integer.toString(geoAddressEntity.getNumber()));
    location.setLetter(geoAddressEntity.getLetter());
    location.setPostal(geoAddressEntity.getPostal());
    location.setCity(geoAddressEntity.getCity());
    if (geoAddressEntity.getGeo() != null && geoAddressEntity.getGeo().getCoordinate() != null) {
      location.setX(geoAddressEntity.getGeo().getCoordinate().x);
      location.setY(geoAddressEntity.getGeo().getCoordinate().y);
    }
		
		return location;
	}

  public static Contract contractEntity(ContractEntity contractEntity) {
    Contract contract = new Contract();
    contract.setId(contractEntity.getId());
    contract.setAccepted(contractEntity.getAccepted());
    contract.setDateCreated(contractEntity.getDateCreated());
    return contract;
  }

  public static ContractSpecification contractSpecificationEntity(ContractSpecificationEntity contractSpecificationEntity) {
    ContractSpecification contractSpecification = new ContractSpecification();
    contractSpecification.setId(contractSpecificationEntity.getId());
    contractSpecification.setDescription(contractSpecificationEntity.getDescription());
    contractSpecification.setDateCreated(contractSpecificationEntity.getDateCreated());
    contractSpecification.setDateStart(contractSpecificationEntity.getDateStart());
    contractSpecification.setDateEnd(contractSpecificationEntity.getDateEnd());
    contractSpecification.setActive(contractSpecificationEntity.getActive());
    
    return contractSpecification;
  }

  public static ContractSpecificationItem contractSpecificationItemEntity(ContractSpecificationItemEntity contractSpecificationItemEntity) {
    ContractSpecificationItem contractSpecificationItem = new ContractSpecificationItem();
    contractSpecificationItem.setId(contractSpecificationItemEntity.getId());
    contractSpecificationItem.setSpecificationNumber(contractSpecificationItemEntity.getSpecificationNumber());
    contractSpecificationItem.setName(contractSpecificationItemEntity.getName());
    contractSpecificationItem.setPrice(contractSpecificationItemEntity.getPrice());
    contractSpecificationItem.setUnit(contractSpecificationItemEntity.getUnit());
    contractSpecificationItem.setActive(contractSpecificationItemEntity.getActive());
    
    return contractSpecificationItem;
  }

  public static OrderSpecificationItem orderSpecificationItemEntity(OrderSpecificationItemEntity orderSpecificationItemEntity) {
    OrderSpecificationItem orderSpecificationItem = new OrderSpecificationItem();
    orderSpecificationItem.setId(orderSpecificationItemEntity.getId());
    orderSpecificationItem.setAmount(orderSpecificationItemEntity.getAmount());
    orderSpecificationItem.setContractSpecificationItem(contractSpecificationItemEntity(orderSpecificationItemEntity.getContractSpecificationItem()));
    return orderSpecificationItem;
  }

  public static Order orderEntity(OrderEntity orderEntity, DomainType domainType) {
    Order order = new Order();
    order.setId(orderEntity.getId());
    order.setDescription(orderEntity.getDescription());
    order.setDateCreated(orderEntity.getDateCreated());
    order.setDateEnded(orderEntity.getDateEnded());
    order.setContractorDomain(domainEntity(orderEntity.getDomain()));

    if (orderEntity.getStatus() != null) {
      order.setStatus(statusEntity(orderEntity.getStatus()));
    }
    if (orderEntity.getActionTypeEntity() != null) {
      order.setActionType(actionTypeEntity(orderEntity.getActionTypeEntity()));
    }
    if (orderEntity.getOrderCategory() != null) {
      for (OrderCategoryEntity orderCategoryEntity: orderEntity.getOrderCategory()) {
        order.getCategories().add(categoryEntity(orderCategoryEntity.getCategory()));
      }
    }

    if (orderEntity.getUser() != null) {
      order.setUser(userEntity(orderEntity.getUser()));
    }
    
    if (orderEntity.getGroup() != null) {
      order.setGroup(groupEntity(orderEntity.getGroup()));
    }

    if (orderEntity.getOrderSpecificationItems() != null) {
      for (OrderSpecificationItemEntity orderSpecificationItemEntity: orderEntity.getOrderSpecificationItems()) {
        order.getOrderSpecificationItems().add(orderSpecificationItemEntity(orderSpecificationItemEntity));
      }
    }

    if (orderEntity.getOrderNote() != null) {
      order.setNotes(new ArrayList<>());
      for (OrderNoteEntity orderNoteEntity: orderEntity.getOrderNote()) {
        if (domainType.getId() == DomainTypeEnum.GOVERNMENT.id && orderNoteEntity.getDefinite()) {
          order.getNotes().add(orderNoteEntity(orderNoteEntity));
        } else if (domainType.getId() == DomainTypeEnum.CONTRACTOR.id) {
          order.getNotes().add(orderNoteEntity(orderNoteEntity));
        }
      }
    }
    

    return order;
  }

  public static NoteType noteTypeEntity(NoteTypeEntity noteTypeEntity) {
    NoteType noteType = new NoteType();
    noteType.setId(noteTypeEntity.getId());
    noteType.setName(noteTypeEntity.getName());
    return noteType;
  }

  public static Note noteEntity(NoteEntity noteEntity) {
    Note note = new Note();
    note.setId(noteEntity.getId());
    note.setContent(noteEntity.getContent());
    note.setDateCreated(noteEntity.getDateCreated());

    note.setType(noteTypeEntity(noteEntity.getNoteType()));
    note.setUser(userEntity(noteEntity.getUser()));

    return note;
  }

  public static OrderNote orderNoteEntity(OrderNoteEntity orderNoteEntity) {
    OrderNote orderNote = new OrderNote();
    orderNote.setId(orderNoteEntity.getId());
    orderNote.setContent(orderNoteEntity.getContent());
    orderNote.setDateCreated(orderNoteEntity.getDateCreated());
    orderNote.setUser(userEntity(orderNoteEntity.getUser()));
    orderNote.setDefinite(orderNoteEntity.getDefinite());

    return orderNote;
  }
}
