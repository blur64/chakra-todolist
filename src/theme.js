import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#1A202C",
        color: "#EDF2F7",
      }
    }
  },
  components: {
    Input: {
      baseStyle: {
        field: {
          borderRadius: "200px",
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: "gray.700",
            backgroundColor: "gray.700",
            _focusVisible: {
              borderColor: "green.300",
              boxShadow: "none",
              borderWidth: "2px"
            },
            _hover: {
              borderColor: "gray.200",
            }
          }
        }
      },
    },
    Tabs: {
      baseStyle: {
        root: {
          borderColor: "gray.700",
        },
        tab: {
          _selected: { color: "green.300" },
          _active: { backgroundColor: "transparent" }
        },
      },
      variants: {
        line: {
          tablist: {
            borderColor: "rgba(255, 255, 255, 0.1)"
          }
        }
      }
    },
    Icon: {
      variants: {
        appBaseIcon: {
          color: "gray.400",
        }
      }
    },
    Button: {
      baseStyle: {
        rounded: "full",
      },
      variants: {
        ghost: {
          _hover: { backgroundColor: "gray.700" },
        },
        outline: {
          color: "#EDF2F7",
          border: "2px",
          borderColor: "gray.700",
          _hover: { backgroundColor: "gray.700" },
          _active: { backgroundColor: "gray.700" }
        }
      },
    },
    Checkbox: {
      variants: {
        circular: {
          control: {
            rounded: "full",
            padding: 2,
          },
        }
      }
    },
    Menu: {
      baseStyle: {
        list: {
          border: "none",
          backgroundColor: "gray.700"
        },
        item: {
          backgroundColor: "gray.700",
          _hover: { backgroundColor: "gray.600" },
        }
      },
    },
  },
});