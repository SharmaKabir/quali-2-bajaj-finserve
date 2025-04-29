import React from 'react';
import { FormField } from '../types';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  field: FormField;
}

export const DynamicField: React.FC<FormFieldProps> = ({ field }) => {
  

  return (
    <div className="form-field">
      {field.type !== 'checkbox' && (
        <label htmlFor={field.fieldId}>{field.label}</label>
      )}
      {renderField()}
      {errors[field.fieldId] && (
        <p className="error-message">
          {String(errors[field.fieldId]?.message || 'field error')}
        </p>
      )}
    </div>
  );
};