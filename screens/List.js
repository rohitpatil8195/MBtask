import React from 'react';
import {Text,View,FlatList,TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
class List extends React.Component{
    
    constructor(props) {
        super(props);
      this.state={
        // ApiData:[],
         result_data:[],
         filterd_result_data:[],
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
 //console.log("data yee"+(datas)['user']['description'])
//    const check_fin = this.state.Home_data.filter(x=>x.available_capacity >= this.state.Weight[i]);  

    this.setState({
       
         result_data:datas,
         filterd_result_data:datas
        })
   // console.log("al",this.state.result_data)
  })
  
  .catch(error => {
      this.setState({ errorMessage: error.toString() });
      console.error('There was an error!', error);
  });

  }


  searchFilterFunction = (text) => {
    // Check if searched text is not blank
  //  let newData =[this.state.result_data]
  //  console.log("text",text)
    if (text != '') {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
   
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
      // setFilteredDataSource(newData);
      // Search(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      this.setState({
        filterd_result_data:this.state.result_data,
        Search:text
      })
      // setFilteredDataSource(masterDataSource);
      // setSearch(text);
    }
  };



    render(){
       // this.submit_form();
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
                    <View style={{borderColor:'blue',alignItems:'center',flexDirection:'row',height:65}}>
                    <TouchableOpacity style={{marginRight:15}}>
                    <AntDesign
                      name="hearto"
                    style={{fontSize:25,color:'black'}}
                   />
                    </TouchableOpacity>
                    </View>
                    </View>
                }

                />
               
            </View>
        );
    }
}

export default List;