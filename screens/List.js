import React from 'react';
import {Text,View,FlatList,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firebase from "firebase";
import { firebaseConfig } from "../config";
class List extends React.Component{
    
    constructor(props) {
        super(props);
        this.database = firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid);
      this.state={
         ApiData:[],
         result_data:[],
         filterd_result_data:[],
         isCheck1:false,
         favr:false
      }
    }
    componentDidMount=()=>{
        this.submit_form();
    }

    submit_form=()=>{
        //  console.log("quant",tempArr[index].productId)

  //unit of measure this.state.unitEx1
// console.log("unit",this.state.unit_values)

  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      
  };
 //console.log("requestOptions",JSON.stringify(requestOptions))

  fetch("https://api.giphy.com/v1/gifs/trending?api_key=nnCFnpBKu4pOIwONyfNg3EIDEk47gbv1&limit=100&rating=g",requestOptions)
  .then(async response => {
      const data = await response.json();
      const datas = (data['data'])
// console.log("data yee"+(datas))
//  for(let i=0 ; i>=datas.length;i++){
     this.setState({
        ApiData:datas
     }) 
//  }
 //data['data'][0]['user']['description']
//    const check_fin = this.state.Home_data.filter(x=>x.available_capacity >= this.state.Weight[i]);  
for(let i=0; i<this.state.ApiData.length; i++){
    this.state.ApiData[i]['favr'] = this.state.favr
    // return  this.state.ApiData[i](data => this.state.ApiData['data'][i]['user']['description'] != null && this.state.ApiData['data'][i]['user']['avatar_url'] != null);
}
console.log("ApiData",JSON.stringify(this.state.ApiData))
// var filterArray = this.state.ApiData.filter(
//     data =>this.state.ApiData['data'][0]['user']['description'] != null,
//   );
//   console.log("filterArray",filterArray)
    this.setState({
       
         result_data:this.state.ApiData,
         filterd_result_data:this.state.ApiData
        })
   // console.log("al",this.state.result_data)
  })
  
  .catch(error => {
      this.setState({ errorMessage: error.toString() });
      console.error('There was an error!', error);
  });

  }


  searchFilterFunction = (text) => {
  
    if (text != '') {
      
   
    const newData = this.state.result_data.filter(
        function (item) {
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      //console.log("newdata",newData)
      this.setState({
        filterd_result_data:newData,
        Search:text
      })
     
    } else {
     
      this.setState({
        filterd_result_data:this.state.result_data,
        Search:text
      })
   
    }
  };


  isCheck1Pressed = (fv) => {
      console.log("index",fv)
    if (!this.state.isCheck1) {
        this.setState({ isCheck1: true })
        // this.state.ApiData[index]['favr']===true
    } else {
        this.setState({ isCheck1: false })
    }
  
}

isCheck2Pressed = () => {
    if (!this.state.isCheck2) {
        this.setState({ isCheck2: true })
    } else {
        this.setState({ isCheck2: false })
    }
}

addFav=(fv)=>{
    
    console.log("fv",fv)
  
}

// addFav=(id)=>{






//     var li = [];
//     li.push(id);
//     const reference = firebase.database().ref('/users/');
//     var userId =  firebase.auth().currentUser.uid;
//     console.log('userId',userId)
// firebase.database()
// .ref('/users/'+ userId)
// .push({
//   UID:li
// })
// .then(() => console.log('Data set.'));
//     console.log("item",id)
// // const list = [];



// }




    render(){
     
        return(
            <View>
               
                <View style={{borderColor:'black',borderRadius:10,borderWidth:1,height:50,marginBottom:10,marginTop:10,marginLeft:8,marginRight:8}}>
                    <TextInput placeholder="search "  onChangeText={(text)=>this.searchFilterFunction(text)} />
                </View>
                <FlatList
      data={ this.state.filterd_result_data }
      ItemSeparatorComponent = {this.ItemSeparatorLine}
      keyExtractor={(item, index) => index}
  renderItem={({item}) => 
  <View style={{flexDirection:'row',borderBottomColor:'black',borderBottomWidth:1,justifyContent:'space-between'}}>
  <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Details',{
        itemData:item

  })}}>

                <View style={{flexDirection:'row',alignItems:'center',height:65,marginBottom:10,width:300,marginLeft:5}}>
                <Text style={{marginLeft:5,marginTop:'5%',fontSize:14}}>{item.title}</Text>
               
                </View>
                </TouchableOpacity>
                    <View style={{borderColor:'blue',alignItems:'center',flexDirection:'row',height:65,marginRight:25}}>
                    <TouchableWithoutFeedback style={{marginRight:30}} onPress={(index,fv)=>this.isCheck1Pressed(item.index,item.fv)} onChangeValue={item.frev === true}>{ this.state.isCheck1 ?
                    <AntDesign
                      name="heart"
                    style={{fontSize:25,color:'red'}}
                   /> :  <AntDesign
                   name="hearto"
                 style={{fontSize:25,color:'black'}}
                />
                }
                    </TouchableWithoutFeedback>
                    </View>
                    </View>
                }

                />
               
            </View>
        );
    }
}

export default List;