import { Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  onPress,
  bgVarient = "bg-[#0286FF]",
  className,
  textVariant = "text-white",
  title = "Find",
  Iconleft,
  IconRight,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={`w-full rounded-full p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70  ${bgVarient} ${className}`}
      onPress={onPress}
      {...props}>
      {Iconleft && <Iconleft />}
      <Text className={`text-lg font-bold ${textVariant}`}>{title}</Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
