import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormResponse, FormValues } from '../types';
import { DynamicField } from './FormFields';

interface DynamicFormProps {
  formData: FormResponse;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formData }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const methods = useForm<FormValues>();
  const { handleSubmit } = methods;
  
  const sections = formData.form.sections;
  const currentSection = sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === sections.length - 1;
  
  const validateCurrentSection = async () => {
    const result = await methods.trigger(
      currentSection.fields.map(field => field.fieldId)
    );
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentSection();
    if (isValid && currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="dynamic-form-container">
      <h2>{formData.form.formTitle}</h2>
      
      
      <div className="section-progress">
        {sections.map((section, index) => (
          <div 
            key={section.sectionId} 
            className={`progress-indicator ${index === currentSectionIndex ? 'active' : ''} ${index < currentSectionIndex ? 'completed' : ''}`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      
      <div className="section-content">
        <h3>{currentSection.title}</h3>
        <p>{currentSection.description}</p>
        
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {currentSection.fields.map((field) => (
              <DynamicField key={field.fieldId} field={field} />
            ))}
            
            <div className="form-navigation">
              {currentSectionIndex > 0 && (
                <button type="button" onClick={handlePrev}>
                  Previous
                </button>
              )}
              
              {!isLastSection && (
                <button type="button" onClick={handleNext}>
                  Next
                </button>
              )}
              
              {isLastSection && (
                <button type="submit">Submit</button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default DynamicForm;