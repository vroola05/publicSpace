package org.commonground.ps.backendapi.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.lang.reflect.Field;

import org.commonground.ps.backendapi.model.CallList;
import org.commonground.ps.backendapi.model.QueryParameters;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilter;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilterType;
import org.commonground.ps.backendapi.model.QueryParametersFilterValue;

public class QueryParametersValidatorImpl implements ConstraintValidator<QueryParametersValidator, QueryParameters> {
    @Override
    public void initialize(QueryParametersValidator queryParametersValidator) {
    }

    @Override
    public boolean isValid(QueryParameters queryParameters, ConstraintValidatorContext context) {

        if(queryParameters.getOffset() < 0) {
            setMessage(context, "offset", "Alleen positive nummers toegestaan");
            return false;
        }

        if(queryParameters.getSize() < 0) {
            setMessage(context, "size", "Alleen positive nummers toegestaan");
            return false;
        }
        if (queryParameters.getFilters() != null) {
            for (QueryParametersFieldFilter qpff:  queryParameters.getFilters()) {
                if (qpff.getField() == null) {
                    setMessage(context, qpff.getField(), "Filter field is verplicht");
                    return false;
                }
                try {
                    Field field = CallList.class.getDeclaredField(qpff.getField());
                    if (field == null) {
                        setMessage(context, qpff.getField(), "Veld bestaat niet");
                        return false;
                    }
                    if (!isType(field.getType().getName(), qpff.getType())) {
                        setMessage(context, qpff.getField(), "Wrong type");
                        return false;
                    }

                } catch (NoSuchFieldException e) {
                    setMessage(context,  qpff.getField(), "Veld bestaat niet");
                    return false;
                } catch (SecurityException e) {
                    setMessage(context, qpff.getField(), "Er ging iets fout");
                    return false;
                }

                switch(qpff.getOperator()) {
                    case EQUAL:
                        if(!hasValue(qpff.getType(), qpff.getValue())) {
                            setMessage(context, qpff.getField(), "Waarde is verplicht");
                            return false;
                        }
                        break;
                    case BETWEEN:

                        break;
                    case IN:
                        break;
                    default:
                        break;
                }
            }
        }
        

        return true;
    }

    public boolean isType(String fieldType, QueryParametersFieldFilterType paramType) {
        return (fieldType.equals("java.util.Date") && paramType == QueryParametersFieldFilterType.DATE)
            || (fieldType.equals("java.lang.String") && paramType == QueryParametersFieldFilterType.TEXT)
            || (fieldType.equals("java.lang.Long") && paramType == QueryParametersFieldFilterType.NUMBER);
    }

    public boolean hasValue(QueryParametersFieldFilterType type, QueryParametersFilterValue value) {
        switch(type) {
        case DATE:
            return value.getDate() != null;
        case NUMBER:
            return value.getNumber() != null;
        case TEXT:
            return value.getText() != null;
        default:
            return false;
        }
    }

    public void setMessage(ConstraintValidatorContext context, String name, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addPropertyNode(name).addConstraintViolation();
    }
}
