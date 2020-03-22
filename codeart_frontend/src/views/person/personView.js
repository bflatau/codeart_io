import React from 'react';
import './styles.scss';
import { Helmet } from 'react-helmet';
import { storyPeople } from '../../constants/appData/people';
import { Redirect} from 'react-router-dom';



class PersonView extends React.Component {
	// constructor (props) {
	// 	super(props);

	// 	this.state = {
	// 		currentImageIndex: 0,
	// 		projectImages: this.props.images.map((picture) => {
	// 			const img = new Image();
	// 			img.src = picture;
	// 			return img
	// 		}) 
	// 	};

	// }

	
	
    componentDidMount() {
      console.log('loaded yo!');
	}
	

	
	render () {
		return (
			  <div className="person-content-container">
          <Helmet>
            <title>Oral History</title>
            <meta
              name="Person"
              content="person's name maybe?"
            />
          </Helmet>

          <div> sup now</div>
        </div>
    
		);
	}
}

export default PersonView;




// function personMatch(input) {
//  return  storyPeople.find(value => value.url === input.location.pathname.slice(1));
// }

// const PersonView = ({apiData, apiRequested, apiDataLoaded, history} = props) => (

//   <div className="person-content-container">
//     <Helmet>
//       <title>Oral History</title>
//       <meta
//         name="Person"
//         content="person's name maybe?"
//       />
//     </Helmet>

//     <div> 
//       <div
//       onClick={()=> apiRequested() }>

//       {
//         (!apiDataLoaded)? apiData : apiData.responseArray[0].story_author
//       }
//         {console.log(apiData)}
//       </div>
  

      


//       {/* {
//         (personMatch(props)) ? 

//         <PersonContents
//           // maps all the available props to the Component (vs defining individually)
//           {...personMatch(props)}
//         /> 
        
//         : <Redirect to="/" />
//       } */}
//     </div>

//   </div>
// );

// export default PersonView;






const PersonContents = ({name, stories, birth, death}) => (
  <div className='person-container'>

    <div className='person-header-text-container'>
      <div className='person-name'> {name} </div>
      <div className='person-birth-death-container'>
        <div className='person-birth-death-text'> {birth} </div>
        <div className='person-birth-death-text'> - </div>
        {(death) ?  <div className='person-birth-death-text'> {death} </div> : null }
      </div>
    </div>

    <div className='person-story-container'>
      {
        (stories.length > 0) ? 
        stories.map((story, id) =>{
          return(
            <div key={id} className='person-story'>
              {(story.title)? <div key={id + 'title'} className='person-story-title'> {story.title} </div> : null }
              <div key={id + 'author'} className='person-story-author'> By {story.author} </div>
              <div key={id + 'date'} className='person-story-date'> {story.date.toDateString()} </div>
              <div key={id + 'text'} className='person-story-text-container'> 
                {story.text.map((paragraph, id) =>{
                  return(<div key={id}  className={'person-story-text'}> {paragraph}</div>)
                })} 
              </div>
            </div>
          )
        }) : null
       
        
      }
    </div>

  </div>
);



