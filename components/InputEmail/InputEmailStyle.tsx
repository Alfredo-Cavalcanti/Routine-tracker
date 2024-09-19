import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '90%',
    margin: 10,
    position: "relative",
},
input: {
    flex: 1,
    height: 40,
    paddingRight: 40,
    paddingHorizontal: 40,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#CCC'
},
lockIcon: {
    
    position: "absolute",
    left: 10,
    color: 'gray'
},
iconContainer: {
    position: "absolute",
    right: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
}
  
});