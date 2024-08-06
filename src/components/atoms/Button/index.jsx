import * as S from './style';

import Text from '@components/atoms/Text';

export default function Button({
  text,
  size = '0.875',
  color = '#333',
  backgroundColor = '#fff',
  onClick,
  ...props
}) {
  return (
    <S.Layout backgroundColor={backgroundColor} onClick={onClick} {...props}>
      <Text size={size} color={color}>
        {text}
      </Text>
    </S.Layout>
  );
}
