import React from 'react'

import Grid from 'material-ui/Grid';

import RecentActivityCard from './RecentActivityCard'


const postData = [
  { initials: "P",
    school: "Noble Street PCS",
    date: "January 21, 2018",
    img: "http://simpsoncoulter.com/wp-content/uploads/2015/06/2015-06-Interior-Gym.jpg",
    area: "Gym Floor",
    text: "We recently refinished our gym floor.  We considered three vendors for the job...",
    id: 1
  },
  { initials: "M",
    school: "Jones College Prep",
    date: "February 1, 2018",
    img: "https://www.partitionsandstalls.com/images/dynamicslideshow/slides/partitions-and-stalls.jpg",
    area: "Bathroom Stalls",
    text: "Up until last year, our building had the original stalls in the bathrooms.  We came...",
    id: 2
  },
  { initials: "J",
    school: "Walter Peyton PCS",
    date: "March 2, 2018",
    img: "https://ssl.c.photoshelter.com/img-get/I0000RcN9uz0ykkk/s/700/700/Boiler-Room-Furnace-Ice.jpg",
    area: "Boiler",
    text: "Our bioler was ancient, and was costing us a fortune to fix ad hoc.  We replaced it...",
    id: 3
  }
]

export default class RecentActivityBox extends React.Component {

  render () {
    return (

      <Grid container
            alignItems='center'
            direction= 'row'
            justify= 'center'>
        {postData.map(post => (
          <RecentActivityCard post={post} key={post.id} />
          ))}
      </Grid>

    )
  }
}
