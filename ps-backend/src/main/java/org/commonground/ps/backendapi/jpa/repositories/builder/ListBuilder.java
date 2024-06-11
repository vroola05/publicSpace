package org.commonground.ps.backendapi.jpa.repositories.builder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.commonground.ps.backendapi.model.QueryParametersFieldFilter;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilterOperator;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilterType;
import org.commonground.ps.backendapi.model.QueryParametersFilterValue;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

public class ListBuilder<T> {
  private List<QueryParametersFieldFilter> filters;
  private List<Sort.Order> orders;

  public ListBuilder() {
    filters = new ArrayList<>();
    orders = new ArrayList<>();
  }

  public void sortBy(String field, Sort.Direction direction) {
    orders.add(new Sort.Order(direction, field));
  }

  public PageRequest getPage(int offset, int size) {
    return PageRequest.of(offset, size, Sort.by(orders));
  }

  public ListBuilder<T> with(QueryParametersFieldFilter filter) {
    filters.add(filter);
    return this;
  }

  public Specification<T> build() {
    Specification<T> specification = null;

    for (QueryParametersFieldFilter filter : filters) {
      if (specification == null) {
        specification = getSpecification(filter);
      } else {
        specification = Specification.where(specification).and(getSpecification(filter));
      }
    }

    return specification;
  }

  private Specification<T> getSpecification(QueryParametersFieldFilter filter) {
    if (filter.getOperator() == QueryParametersFieldFilterOperator.EQUAL) {
      return getSpecificationEquals(filter);
    } else if (filter.getOperator() == QueryParametersFieldFilterOperator.BETWEEN) {
      return getSpecificationBetween(filter);
    } else if (filter.getOperator() == QueryParametersFieldFilterOperator.IN) {
      return getSpecificationIn(filter);
    }
    return null;
  }


  private Specification<T> getSpecificationBetween(QueryParametersFieldFilter filter) {
    if (filter.getType() == QueryParametersFieldFilterType.DATE) {
      Date from = getValue(filter.getFrom(), filter.getType(), Date.class);
      Date to = getValue(filter.getTo(), filter.getType(), Date.class);
      if (from != null && to != null) {
        return getBetween(filter.getField(), from, to);
      } else if (from != null) {
        return getGreaterThanOrEqualTo(filter.getField(), from);
      } else if (to != null) {
        return getLessThanOrEqualTo(filter.getField(), to);
      }
    } else if (filter.getType() == QueryParametersFieldFilterType.TEXT) {
      String from = getValue(filter.getFrom(), filter.getType(), String.class);
      String to = getValue(filter.getTo(), filter.getType(), String.class);
      if (from != null && to != null) {
        return getBetween(filter.getField(), from, to);
      } else if (from != null) {
        return getGreaterThanOrEqualTo(filter.getField(), from);
      } else if (to != null) {
        return getLessThanOrEqualTo(filter.getField(), to);
      }
    } else if (filter.getType() == QueryParametersFieldFilterType.NUMBER) {
      Long from = getValue(filter.getFrom(), filter.getType(), Long.class);
      Long to = getValue(filter.getTo(), filter.getType(), Long.class);

      if (from != null && to != null) {
        return getBetween(filter.getField(), from, to);
      } else if (from != null) {
        return getGreaterThanOrEqualTo(filter.getField(), from);
      } else if (to != null) {
        return getLessThanOrEqualTo(filter.getField(), to);
      }
    }
    return null;
  }

  private Specification<T> getSpecificationEquals(QueryParametersFieldFilter filter) {
    if (filter.getType() == QueryParametersFieldFilterType.DATE) {
      return getEqualDate(filter.getField(), getValue(filter.getValue(), filter.getType(), Date.class));
    } else if (filter.getType() == QueryParametersFieldFilterType.NUMBER) {
      return getEqualNumber(filter.getField(), getValue(filter.getValue(), filter.getType(), Long.class));
    } else if (filter.getType() == QueryParametersFieldFilterType.TEXT) {
      return getEqualString(filter.getField(), getValue(filter.getValue(), filter.getType(), String.class));
    }
    return null;
  }

  private Specification<T> getSpecificationIn(QueryParametersFieldFilter filter) {
    if (filter.getType() == QueryParametersFieldFilterType.DATE) {
      return getInDate(filter.getField(), filter.getList().stream().map(v -> v.getDate())
      .collect(Collectors.toList()));
    } else if (filter.getType() == QueryParametersFieldFilterType.NUMBER) {
      return getInNumber(filter.getField(), filter.getList().stream().map(v -> v.getNumber())
      .collect(Collectors.toList()));
    } else if (filter.getType() == QueryParametersFieldFilterType.TEXT) {
      return getInText(filter.getField(), filter.getList().stream().map(v -> v.getText())
      .collect(Collectors.toList()));
    }
    return null;
  }

  private Specification<T> getEqualString(String field, String value) {
    return (root, query, builder) -> builder.like(builder.lower(root.get(field)), value == null ? "" : "%" + value.toLowerCase() + "%");
  }

  private Specification<T> getEqualNumber(String field, Long value) {
    return (root, query, builder) -> builder.equal(root.get(field), value == null ? null : value);
  }

  private Specification<T> getEqualDate(String field, Date value) {
    return (root, query, builder) -> builder.equal(root.get(field), value);
  }

  private Specification<T> getInText(String field, List<String> value) {
    return (root, query, builder) -> root.get(field).in(value);
  }

  private Specification<T> getInNumber(String field, List<Long> value) {
    return (root, query, builder) -> root.get(field).in(value);
  }

  private Specification<T> getInDate(String field, List<Date> value) {
    return (root, query, builder) -> root.get(field).in(value);
  }

  private Specification<T> getBetween(String field, Long from , Long to) {
    return (root, query, builder) -> builder.between(root.get(field), from, to);
  }

  private Specification<T> getBetween(String field, Date from , Date to) {
    return (root, query, builder) -> builder.between(root.get(field), from, to);
  }

  private Specification<T> getBetween(String field, String from , String to) {
    return (root, query, builder) -> builder.between(root.get(field), from, to);
  }

  private Specification<T> getLessThanOrEqualTo(String field, Date value) {
    return (root, query, builder) -> builder.lessThanOrEqualTo(root.get(field).as(Date.class), value);
  }

  private Specification<T> getLessThanOrEqualTo(String field, Long value) {
    return (root, query, builder) -> builder.lessThanOrEqualTo(root.get(field).as(Long.class), value);
  }

  private Specification<T> getLessThanOrEqualTo(String field, String value) {
    return (root, query, builder) -> builder.lessThanOrEqualTo(root.get(field).as(String.class), value);
  }

  private Specification<T> getGreaterThanOrEqualTo(String field, Date value) {
    return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get(field).as(Date.class), value);
  }

  private Specification<T> getGreaterThanOrEqualTo(String field, Long value) {
    return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get(field).as(Long.class), value);
  }

  private Specification<T> getGreaterThanOrEqualTo(String field, String value) {
    return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get(field).as(String.class), value);
  }

  public <K> K getValue(QueryParametersFilterValue value, QueryParametersFieldFilterType type, Class<K> clazz) {
    switch(type) {
    case DATE:
      return clazz.cast(value.getDate());
    case NUMBER:
      return clazz.cast(value.getNumber());
    case TEXT:
      return clazz.cast(value.getText());
    default:
      return null;
    }
  }
}
