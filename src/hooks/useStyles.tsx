import { useWindowDimensions } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export function useStyles() {
  const windowWidth = useWindowDimensions().width;
  const alignmentStyle =
    windowWidth > 1001
      ? {
          paddingHorizontal: responsiveWidth(25),
        }
      : {};
  return {
    alignmentStyle,
  };
}
