import FormFileDragger from "@/component/atoms/form/FormFileDragger";
import FormInput from "@/component/atoms/form/FormInput";
import FormSelect from "@/component/atoms/form/FormSelect";
import { IFieldData } from "@/interfaces";



export const renderFormField = (
    fieldData: IFieldData[],
    formData: Record<string, any>,
    errors: Record<string, string> | any,
    handleFormFieldChange: (name: string, value: any) => void
  ) => {
    if (!fieldData?.length) return null;
  
    return fieldData.length === 1 ? (
      getFormField(fieldData[0], formData, errors, handleFormFieldChange)
    ) : (
      <div className='flex justify-between gap-x-6'>
        {fieldData.map((field) =>
          getFormField(field, formData, errors, handleFormFieldChange)
        )}
      </div>
    );
  };


const getFormField = (
    fieldData: IFieldData,
    formData: Record<string, any>,
    errors: Record<string, string> | any,
    handleFormFieldChange: (name: string, value: any) => void
  ) => {
    const { fieldType, label, name, placeholder, options, suffixIcon, prefixIcon} = fieldData;
    switch (fieldType) {
        case 'select':
            return (
              <FormSelect
                key={name}
                label={label}
                name={name}
                value={formData[name]}
                onChange={(value) => handleFormFieldChange(name, value)}
                error={errors[name]?.message || errors[name]}
                options={options || []}
                placeholder={placeholder || ''}
                disabled={fieldData.disabled}
                defaultValue={fieldData.defaultValue}
              />
            );
          case 'input':
            return (
              <FormInput
                key={name}
                label={label}
                name={name}
                placeholder={placeholder || ''}
                value={formData[name]}
                suffixIcon={suffixIcon || ''}
                onChange={(e) => handleFormFieldChange(name, e.target.value)}
                prefixIcon={prefixIcon}
                error={errors[name]?.message || errors[name]}
                disabled={fieldData.disabled}
                readOnly={fieldData?.readonly}
                required={fieldData?.required}
              />
            );
            case 'fileDragger':
              return (
                <FormFileDragger
                  key={name}
                  name={name}
                  onFileChange={handleFormFieldChange}
                  disabled={fieldData.disabled}
                  isMulti={fieldData?.isMulti}
                  value={formData[name]}
                />
              );
            default:
                return null
    }
  }