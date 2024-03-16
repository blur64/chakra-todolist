import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#1A202C",
        color: "#EDF2F7",
      }
    }
  },
  components: {
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
    Button: {
      baseStyle: {
        // textTransform: 'uppercase',
      },
      variants: {
        solid: {
          borderRadius: "200px",
          backgroundColor: "gray.100"
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
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// import reportWebVitals from './reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
