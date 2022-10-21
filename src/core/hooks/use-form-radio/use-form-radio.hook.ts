import { ChangeEvent, useState } from 'react';

import {
  UseFormRadioProps,
  UseFormRadioReturn,
} from './interfaces/use-form-radio.interface';

export default function useFormRadio({
  defaultValueChecked = '',
}: UseFormRadioProps): UseFormRadioReturn {
  const [selectedValue, setSelectedValue] =
    useState<string>(defaultValueChecked);

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

  return {
    selectedValue,
    onChange,
  };
}
