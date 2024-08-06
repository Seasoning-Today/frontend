import * as S from './style';

interface DividerProps {
  borderWidth?: number;
  margin?: number;
  color?: string;
}

export default function Divider({
  borderWidth = 1,
  margin = 0,
  color = '#f0f0f0',
  ...props
}: DividerProps) {
  return (
    <S.Layout
      borderWidth={borderWidth}
      margin={margin}
      color={color}
      {...props}
    />
  );
}
