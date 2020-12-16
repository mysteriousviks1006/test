import React, { Component, Fragment} from 'react'
import './App.css';
import application from 'firebase/app';
import firebase from 'firebase';



const Config = {
  apiKey: "AIzaSyAaBti7rrHNdeUeXOKtZtpng06FkWmsVX4",
  authDomain: "testingapp-e8054.firebaseapp.com",
  databaseURL: "https://testingapp-e8054.firebaseio.com",
  projectId: "testingapp-e8054",
  storageBucket: "testingapp-e8054.appspot.com",
  messagingSenderId: "198776517404",
  appId: "1:198776517404:web:b9cc2086de874bc36440d9",
  measurementId: "G-LWYQD2VH69"
};

firebase.initializeApp(Config);
const db = application.database();

class App extends Component {
constructor(props){
  super(props);
  this.state ={
    users:[],
    accounts:[],
  }
}

componentDidMount(){

const myuser = db.ref("users");
myuser.on("value", (datasnap)=>{
  let allusers = [];
  datasnap.forEach(data=>{
    const dataval= data.val();
    allusers.push({
      id: data.key,
      name: dataval.name,
      account: dataval.account,
      apps:dataval.apps,
      title:dataval.title
    })
  })
  this.setState({users:allusers})
});

const accountref = db.ref("accounts")
accountref.on('value',snapshot=>{
    let accounts = snapshot.val();

    /* const accountList = Object.keys(accounts).map(key=>({
      ...accounts[key]
    })) */

  console.log(accounts)

});


}
  render(){
    return (
      <Fragment>
      <div>
        {
          this.state.users.map(user=>
            <div key={user.id}>
              <br/>
              <h2>User Details</h2>
              Name:  {user.name}
              <br/>
              account:  {user.account}
              <br/>
              <h2>{user.name} Apps</h2>
              app:  {user.apps}
              <br/>
              title:  {user.title}
            </div>)
        }
      </div>
      <div>
        <h1>hello world</h1>
        {this.state.accounts.map((item,index)=>
          {return (
          <div>
            {item}
          </div>)}
        )}
        {/* <Accounts data={this.state.accounts}/> */}
      </div> 
      </Fragment>
    );
  }
  
}

export default App;