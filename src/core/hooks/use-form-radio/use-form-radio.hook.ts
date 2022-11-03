import { ChangeEvent, useEffect, useState } from 'react';

import {
  UseFormRadioProps,
  UseFormRadioReturn,
} from './interfaces/use-form-radio.interface';

export default function useFormRadio({
  defaultValueChecked = '',
  radioGroupName = 'Seleção',
}: UseFormRadioProps): UseFormRadioReturn {
  const [selectedValue, setSelectedValue] =
    useState<string>(defaultValueChecked);
  const [error, setError] = useState<string>('');

  /**
   * Function that validates if the value of the radio is empty.
   *
   * @returns {boolean}
   */
  function handleValidation(): boolean {
    if (selectedValue === '') {
      setError(`${radioGroupName} é obrigatório.`);

      return false;
    }

    setError('');

    return true;
  }

  /**
   * Function that receives the 'target' of the radio button and updates the
   * state value.
   *
   * @param {EventTarget} target
   * @returns {void}
   */
  function onChange({ target }: ChangeEvent<HTMLInputElement>): void {
    setSelectedValue(target.value);
  }

  useEffect(() => {
    setError('');
  }, [selectedValue !== '']);

  return {
    selectedValue,
    error,
    handleValidation,
    onChange,
  };
}
