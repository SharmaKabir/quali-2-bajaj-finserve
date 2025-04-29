import React from 'react';
import { FormField } from '../types';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  field: FormField;
}

export const DynamicField: React.FC<FormFieldProps> = ({ field }) => {
  const { register, formState: { errors } } = useFormContext();
  
  
  const validation = {
    required: field.required ? field.validation?.message || 'This field is required' : false,
    minLength: field.minLength
      ? {
          value: field.minLength,
          message: `Minimum length is ${field.minLength} characters`
        }
      : undefined,
    maxLength: field.maxLength
      ? {
          value: field.maxLength,
          message: `Maximum length is ${field.maxLength} characters`
        }
      : undefined
  };
  
  
  let fieldElement;
  
  if (field.type === 'text' || field.type === 'tel' || field.type === 'email' || field.type === 'date') {
    fieldElement = (
      <input
        type={field.type}
        placeholder={field.placeholder}
        data-testid={field.dataTestId}
        {...register(field.fieldId, validation)}
      />
    );
  } else if (field.type === 'textarea') {
    fieldElement = (
      <textarea
        placeholder={field.placeholder}
        data-testid={field.dataTestId}
        {...register(field.fieldId, validation)}
      />
    );
  } else if (field.type === 'dropdown') {
    fieldElement = (
      <select
        data-testid={field.dataTestId}
        {...register(field.fieldId, validation)}
      >
        <option value="">Select an option</option>
        {field.options?.map(option => (
          <option 
            key={option.value} 
            value={option.value}
            data-testid={option.dataTestId}
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  } else if (field.type === 'radio') {
    fieldElement = (
      <div className="radio-group">
        {field.options?.map(option => (
          <div key={option.value} className="radio-option">
            <input
              type="radio"
              id={`${field.fieldId}-${option.value}`}
              value={option.value}
              data-testid={option.dataTestId}
              {...register(field.fieldId, validation)}
            />
            <label htmlFor={`${field.fieldId}-${option.value}`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  } else if (field.type === 'checkbox') {
    if (field.options && field.options.length > 0) {
      fieldElement = (
        <div className="checkbox-group">
          {field.options.map(option => (
            <div key={option.value} className="checkbox-option">
              <input
                type="checkbox"
                id={`${field.fieldId}-${option.value}`}
                value={option.value}
                data-testid={option.dataTestId}
                {...register(field.fieldId)}
              />
              <label htmlFor={`${field.fieldId}-${option.value}`}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      );
    } else {
      fieldElement = (
        <div className="checkbox-single">
          <input
            type="checkbox"
            id={field.fieldId}
            data-testid={field.dataTestId}
            {...register(field.fieldId, validation)}
          />
          <label htmlFor={field.fieldId}>{field.label}</label>
        </div>
      );
    }
  } else {
    fieldElement = <p>Unsupported field type: {field.type}</p>;
  }

  return (
    <div className="form-field">
      {field.type !== 'checkbox' && (
        <label htmlFor={field.fieldId}>{field.label}</label>
      )}
      {fieldElement}
      {errors[field.fieldId] && (
        <p className="error-message">
          {String(errors[field.fieldId]?.message || 'field error')}
        </p>
      )}
    </div>
  );
};