export interface RadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  name: string;
  value: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}
