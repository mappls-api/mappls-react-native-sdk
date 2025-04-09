import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';



const IndoorView = (props) => {

    const [floors,setFloors] = React.useState([]);
    const [selectedFloor,setSelectedFloor] = React.useState();

    React.useEffect(() => {
        if(!props.floorData){
            return;
        }
     setSelectedFloor(props.floorData.selectedFloor=== 0?'G':props.floorData.selectedFloor)
     const localFloors = [];
     let floorCount = props.floorData.floors;
     if (props.floorData.initialFloor < 0) {
       floorCount = floorCount + props.floorData.initialFloor;
    }

    for (let i = props.floorData.initialFloor; i < floorCount; i++) {
        if(i === 0){
            localFloors.push('G');
        }else{
            localFloors.push(i);
        }
    }
    setFloors(localFloors.reverse())
    },[])
    //console.log("FLOOR DATA",props);

    return(
        <View style={props.position?convertPositionIntoStyle(props.position):styles.bottomLeft}>
         <FlatList data={floors} renderItem={({item,index}) => <TouchableOpacity style={{paddingVertical:!(index ===0||index === floors.length-1)?8:0}} onPress={() => {
             setSelectedFloor(item)
             props.onFloorPress(item === 'G'?0:item)
         }} >
         <Text style={[styles.text,{color:selectedFloor === item?'blue':'black'}]}>{item}</Text>
         </TouchableOpacity>} />
        </View>
    )
  }


 
  const styles = StyleSheet.create({
      bottomLeft: {backgroundColor:'white',position:"absolute",left:50,bottom:20,borderRadius:20,alignItems:'center',paddingVertical:10,paddingHorizontal:15,elevation:5},
      bottomRight: {backgroundColor:'white',position:"absolute",right:50,bottom:20,borderRadius:20,alignItems:'center',paddingVertical:10,paddingHorizontal:15,elevation:5},
      topLeft: {backgroundColor:'white',position:"absolute",left:50,top:20,borderRadius:20,alignItems:'center',paddingVertical:10,paddingHorizontal:15,elevation:5},
      topRight: {backgroundColor:'white',position:"absolute",right:50,top:20,borderRadius:20,alignItems:'center',paddingVertical:10,paddingHorizontal:15,elevation:5},
      text: {
          fontWeight:'bold',
          fontSize:18
      }
  })


  const convertPositionIntoStyle = (position) =>{
      switch(position){
      case 'topLeft':
          return styles.topLeft;
      case 'topRight':
          return styles.topRight;
       case 'bottomLeft':
           return styles.bottomLeft;
        case 'bottomRight':
           return styles.bottomRight;
         default :
         return styles.bottomLeft;   
      }
  }


 export default IndoorView; 
 