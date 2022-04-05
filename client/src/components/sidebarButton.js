import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";

export default function MainLink(props) {
  return (
    <UnstyledButton
      onClick={props.onClick}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={props.color} variant="light">
          {props.icon}
        </ThemeIcon>

        <Text size="sm">{props.label}</Text>
      </Group>
    </UnstyledButton>
  );
}
