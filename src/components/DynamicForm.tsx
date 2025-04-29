import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormResponse, FormSection, FormValues } from '../types';
import { DynamicField } from './FormFields';


interface DynamicFormProps {
    formData: FormResponse;
}




const DynamicForm = (formData) => {
  return (
    <div>DynamicForm</div>
  )
}

export default DynamicForm