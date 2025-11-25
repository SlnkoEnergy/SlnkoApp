import { COLORS, FONTS, SIZES } from "./theme";
import { StyleSheet } from 'react-native';

export const GlobalStyleSheet = StyleSheet.create({
    container: {
        padding: 15,
        maxWidth: SIZES.container,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%'
    },
    formControl: {
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        paddingHorizontal: 15,
    },
    activeInput: {
        borderColor: COLORS.primary,
    },
    label: {
        ...FONTS.font,
        color: COLORS.label,
        marginBottom: 8,
    },
    inputGroup: {
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -5,
    },
    flexcenter :{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    col50: {
        width: '50%',
        paddingHorizontal: 5,
    },
    col33: {
        width: '33.33%',
        paddingHorizontal: 5,
    },
    card: {
        marginBottom: 15,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
    },
    cardHeader: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderColor,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    cardBody: {
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    shadow: {
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    shadow2: {
        borderWidth: 1,
        borderRadius: SIZES.radius,
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    image: {
        width: 20,
        height: 20,
        tintColor: 'red',
        resizeMode: 'contain',
    },
    image3: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    inputBox: {
        height: 48,
        paddingLeft: 50,
        justifyContent: 'center',
        marginBottom: 15,
    },
    background: {
        backgroundColor:COLORS.primaryLight,
        height: 40,
        width: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        ...FONTS.font,
        color: 'red',
        marginLeft: 10,
    },
    TouchableOpacity2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        height: 46,
        justifyContent: 'center'
    },
    shadowPrimary: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .5,
        shadowRadius: 5,
    },
    notification: {
        height: 16,
        width: 16,
        backgroundColor: '#FF3131',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputimage: {
        position: 'absolute',
        left: 15,
        height: 16,
        width: 16,
        resizeMode: 'contain',
        opacity: .8,
    },
    containers: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 500,
    height: 250,
    // marginBottom: 2,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#003366",
    width: "100%",
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 16,
    
    
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loaderContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
},
  gradientBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#eef6ff",
  },

  glassInput: {
    width: "100%",
    paddingVertical: 13,
    paddingHorizontal: 18,
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 14,
    color: "#003366",
    fontWeight: "500",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
    shadowColor: "#003366",
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },



  forgotText: {
    color: "#003366",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 18,
    textDecorationLine: "underline",
  },

  footer: {
    alignItems: "center",
    marginTop: "70%",
  },

  poweredBy: {
    color: "#6c7a96",
    fontSize: 14,
  },

  footerLogo: {
    width: 120,
    height: 50,
    marginTop: 3,
  },

  dialog: {
    backgroundColor: "#e8f1ff",
  },

  dialogTitle: {
    color: "#003366",
    fontWeight: "bold",
  },
    inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 55,

    // Glass effect
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },

  leftIcon: {
    marginRight: 10,
  },

  textInput: {
    flex: 1,
    color: "#003366",
    fontSize: 16,
    fontWeight: "500",
  },

  roundInputContainer: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1.5,
  borderColor: "#003366",
  borderRadius: 30,
  paddingHorizontal: 18,
  height: 55,
  width: "100%",
  backgroundColor: "#fff",

  marginBottom: 20,
},

roundInput: {
  flex: 1,
  fontSize: 15,
  color: "#003366",
  paddingHorizontal: 10,
  fontWeight: "500",
},

eyeButton: {
  padding: 4,
},

});