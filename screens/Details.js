import React from 'react';
import {Text,View,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

class Details extends React.Component{
    constructor(props){
      super(props);
      this.state ={
         newData: this.props.route.params.itemData,
         Img:'',
         Dscrp:''
      }
    }
    componentDidMount=()=>{
     //   console.log("newData",this.state.newData['user']['avatar_url']);
        // if(this.state.newData['user']['avatar_url'] === undefined){
             setTimeout(() => {
        const image =(this.state.newData['user']['avatar_url'])
        const Disc = (this.state.newData['user']['description'])
        this.setState({
            Img:image,
            Dscrp:Disc
        })
    }, 10);
    //     if(image === undefined){
    //         this.setState({
    //             Img:''
    //         })
    //     }else{
    //     this.setState({
    //         Img:image
    //     })
    // }
    }
    render(){
        return(
            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'space-between',height:100}}>
            <View style={{marginTop:10,marginLeft:'80%'}}>
            <TouchableOpacity>
                  <AntDesign
                      name="hearto"
                    style={{fontSize:25,color:'black'}}
                   />
                </TouchableOpacity>
            </View>
                { this.state.Img === '' || this.state.Img === undefined ?<Text>Image Not Avaiable</Text>: <Image 
    style={{width: 250, height: 250,marginTop:30}}   transition={false}
    source={{uri:this.state.Img}}
/>}
                <Text style={{alignItems:'center',marginTop:10,fontSize:14, fontWeight: "bold"}}>{this.state.newData['title']}</Text>
        { this.state.Dscrp === '' || this.state.Dscrp === undefined ?  <Text style={{marginTop:10,fontSize:12,marginRight:5,marginLeft:25}}>description Not Avaiable</Text> :  <Text style={{marginTop:10,fontSize:12,marginRight:5,marginLeft:25}}>{this.state.Dscrp}</Text>  }
            </View>
        )
    }
}
export default Details;