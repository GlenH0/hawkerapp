import {StyleSheet, Dimensions} from 'react-native';

const numColumns = 2
const WIDTH = Dimensions.get("window").width;

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    foodTitle: {
        padding:20, 
        paddingTop: 0,
        fontFamily: 'latoB',
        color: '#5a5a5a'
    },
    foodNum: {
        fontFamily:'latoB',
    },
    foodNumText :{
        fontFamily: 'latoR'
    },
    itemStyle:{
        // shadow 
    shadowOffset: { width: 12, height: 12 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#f6f6f6",
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    flex: 1,
    margin: 10,
    height: WIDTH / numColumns,
    borderRadius: 12
    },
    img: {
        resizeMode: 'cover',
    width: '90%',
    height: '90%',
    overflow: 'hidden',
    borderRadius: 10,
    },
    // filter btn
    buttonFilter: {
        fontFamily: 'latoB', 
        fontSize: 12,
        right: 6 
    },
    button: {
        width: 85,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    filterImg : {
        width: 14,
        height: 14,
        left: 6
    }
})

export const images = {
    ratings: {
      '1': require('../assets/ratings/rating-1.png'),
      '2': require('../assets/ratings/rating-2.png'),
      '3': require('../assets/ratings/rating-3.png'),
      '4': require('../assets/ratings/rating-4.png'),
      '5': require('../assets/ratings/rating-5.png'),
    }
}