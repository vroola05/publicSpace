package org.commonground.ps.backendapi.validators;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.CONSTRUCTOR;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.TYPE_USE;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.Field;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;

import org.commonground.ps.backendapi.model.CallList;
import org.commonground.ps.backendapi.model.QueryParameters;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilter;
import org.commonground.ps.backendapi.model.QueryParametersFieldFilterType;
import org.commonground.ps.backendapi.model.QueryParametersFilterValue;

@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { QueryParametersValidator.Validator.class })
public @interface QueryParametersValidator {
	String message() default "Field value should be from list of ";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	class Validator implements ConstraintValidator<QueryParametersValidator, QueryParameters> {
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
}