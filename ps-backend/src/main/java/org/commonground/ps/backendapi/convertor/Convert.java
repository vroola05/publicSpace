package org.commonground.ps.backendapi.convertor;

import java.util.ArrayList;
import java.util.List;

import org.commonground.ps.backendapi.jpa.entities.ActionEntity;
import org.commonground.ps.backendapi.jpa.entities.ActionTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.CallEntity;
import org.commonground.ps.backendapi.jpa.entities.CategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.CompanyEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainEntity;
import org.commonground.ps.backendapi.jpa.entities.DomainTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.GroupEntity;
import org.commonground.ps.backendapi.jpa.entities.LocationEntity;
import org.commonground.ps.backendapi.jpa.entities.MainCategoryEntity;
import org.commonground.ps.backendapi.jpa.entities.PageButtonEntity;
import org.commonground.ps.backendapi.jpa.entities.PageEntity;
import org.commonground.ps.backendapi.jpa.entities.PageTypeEntity;
import org.commonground.ps.backendapi.jpa.entities.PersonEntity;
import org.commonground.ps.backendapi.jpa.entities.RolesEntity;
import org.commonground.ps.backendapi.jpa.entities.StatusEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;
import org.commonground.ps.backendapi.model.Action;
import org.commonground.ps.backendapi.model.ActionType;
import org.commonground.ps.backendapi.model.Call;
import org.commonground.ps.backendapi.model.Category;
import org.commonground.ps.backendapi.model.Company;
import org.commonground.ps.backendapi.model.Domain;
import org.commonground.ps.backendapi.model.DomainType;
import org.commonground.ps.backendapi.model.Group;
import org.commonground.ps.backendapi.model.Location;
import org.commonground.ps.backendapi.model.MainCategory;
import org.commonground.ps.backendapi.model.Page;
import org.commonground.ps.backendapi.model.PageButton;
import org.commonground.ps.backendapi.model.PageType;
import org.commonground.ps.backendapi.model.Person;
import org.commonground.ps.backendapi.model.Role;
import org.commonground.ps.backendapi.model.Status;
import org.commonground.ps.backendapi.model.User;

public class Convert {
  
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
    userEntity.setAdmin(user.isAdmin());

    return userEntity;
  }

  public static Domain domainEntity(DomainEntity domainEntity) {
		return new Domain(domainEntity.getId(), domainEntity.getDomain(), domainTypeEntity(domainEntity.getDomainType()));
	}

  public static DomainEntity domain(Domain domain) {
    DomainEntity domainEntity = new DomainEntity();
    domainEntity.setId(domain.getId());
    domainEntity.setDomain(domain.getDomain());
		return domainEntity;
	}

  public static DomainType domainTypeEntity(DomainTypeEntity domainTypeEntity) {
		return new DomainType(domainTypeEntity.getId(), domainTypeEntity.getName());
	}
  

  public static Company companyEntity(CompanyEntity companyEntity) {
		return new Company(companyEntity.getId(), companyEntity.getName());
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

  public static Call callEntity(CallEntity callEntity) {
    Call call = new Call();
    call.setId(callEntity.getId());
    call.setCasenumber(callEntity.getCasenumber());
    call.setDescription(callEntity.getDescription());
    call.setDateCreated(callEntity.getDateCreated());
    call.setDateEnded(callEntity.getDateEnded());
    return call;
  }

  public static LocationEntity location(Location location) {
    LocationEntity locationEntity = new LocationEntity();
    locationEntity.setStreet(location.getStreet());
    locationEntity.setNumber(location.getNumber());
    locationEntity.setPostal(location.getPostal());
    locationEntity.setCity(location.getCity());
    locationEntity.setLatitude(location.getLatitude());
    locationEntity.setLongitude(location.getLongitude());
    return locationEntity;
  }

  public static Location locationEntity(LocationEntity locationEntity) {
    Location location = new Location();
    location.setStreet(locationEntity.getStreet());
    location.setNumber(locationEntity.getNumber());
    location.setPostal(locationEntity.getPostal());
    location.setCity(locationEntity.getCity());
    location.setLatitude(locationEntity.getLatitude());
    location.setLongitude(locationEntity.getLongitude());
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
    status.setIcon(statusEntity.getIcon());
    status.setTitle(statusEntity.getTitle());

    return status;
  }

  public static StatusEntity status(Status status) {
    StatusEntity statusEntity = new StatusEntity();

    statusEntity.setId(status.getId());
    statusEntity.setName(status.getName());
    statusEntity.setIcon(status.getIcon());
    statusEntity.setTitle(status.getTitle());

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
    Page page = new Page();
    page.setId(pageEntity.getId());
    page.setName(pageEntity.getName());
    return page;
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

  /*public static Role pageButtonEntity(RolesEntity rolesEntity) {
    Role role = new Role();
    role.setId(rolesEntity.getId());
    role.setAllow(rolesEntity.ge.getName());
    role.setRoute(pageButtonEntity.getRoute());
    return role;
  }*/
  
}
