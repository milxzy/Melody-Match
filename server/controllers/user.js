import User from "../models/user.js";
import Trial from "../models/trial.js";
// import Matches from "../../client/src/components/Matches.jsx";
import { match } from "assert";
import Match from "../models/matches.js"
import asyncHandler from "express-async-handler" 
import generateToken from '../utils/generateToken.js'






export const createUser = async (req, res) => {
  
  
    const user = new User({
        display_name: req.body.display_name,
        spotify_id: req.body.spotify_id,
        country: req.body.country,
        email: req.body.email,
        followed_artists: req.body.followed_artists,
        artist_genres: req.body.artist_genres
        // profile_pic: req.body.profile
      });
      try {
        const newUser = await user.save();
        res.status(201).json(newUser);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
};

export const getUser = async (req, res) => {
    try{
        const id = req.params.id    
        const user = await User.find({ name: id })
        if(user != null){
          res.json(user)
        } else {
          res.status(404).json({message: 'cannot find player'})
        }
       } catch (err) {
      console.error(err)
       }
};

export const deleteDatabase = async (req, res) => {

  console.log('mock delete')
}

export const deleteUser = async (req, res) => { 
    try{
        const id = req.params.id
        
       await Player.deleteOne({ name: id })
        res.json('Deleted player')    
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
};

export const updateUser =  async (req, res) => {
     // finds the player. The purpose of the 2 lines of code below is 
  // to create a variable called id, and have that set to a part of the url
  // then, create a new variable called player, that finds the player with
  // the name from the url
  const id = req.params.id
  const player = await Player.find({ name: id })

  // findOneAndUpdate finds the first focument that matches a filter
  // applies an update, and returns the document 
  const filter = { name: id };
  const update = { earnings: req.body.earnings, server: req.body.server };
  const updatedPlayer = await Player.findOneAndUpdate(filter, update, {
    new: true
  });
  res.json(updatedPlayer)
};


export const displayDashboard = async (req, res) => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "get",
    headers: {
      Authorization: "Bearer " + global.access_token,
    },
  });
  const data = await response.json();
  console.log(data);

  const artistGenres = await fetch(
    "https://api.spotify.com/v1/me/following?type=artist",
    {
      method: "get",
      headers: {
        Authorization: "Bearer " + global.access_token,
      },
    }
  );

  const artistData = await artistGenres.json();

  const allGenres = [];

  artistData.artists.items.forEach((artist) => {
    if (artist.genres && artist.genres.length > 0) {
      allGenres.push(...artist.genres);
    }
  });

  const artistNames = [];
  artistData.artists.items.forEach((artist) => {
    artistNames.push(artist.name);
  });

  res.render("dashboard", { user: data });
  console.log(artistData.artists.items);
  console.log(allGenres);
  console.log(artistNames);
};

export const callback = async (req, res) => {
    const code = req.query.code;
    let body = new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code"
  
    })
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: "post",
      body: body,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: 
        "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
      }
    })
     const data = await response.json()
     const userFromDB = await User.findOne({ email: data.email });
     if (!userFromDB) {
      // Handle case where user is not found in MongoDB
      return res.status(404).send('User not found');
    }
    req.user = { id: userFromDB._id };
    global.access_token = data.access_token;
   
  res.redirect('/dashboard')
}

export const addUserInfo = async (req, res) => {
//   let db_connect = dbo.getDb();
//  let myobj = {
//    name: req.body.name,
//    position: req.body.position,
//    level: req.body.level,
//  };
//  db_connect.collection("records").insertOne(myobj, function (err, res) {
//    if (err) throw err;
//    response.json(res);
//  });
console.log('added user info: ' + req.body)
let someData = JSON.stringify(req.body)
let parsedData = JSON.parse(someData)
console.log(parsedData)

const user = new User({
  contact_info:req.body.form.contactInfo,
  preferred_name:req.body.form.preferredName,
  age:req.body.form.age,
  gender:req.body.form.gender,
  beEmail: req.body.form.beEmail,
  password: req.body.form.bePass,
  genres:req.body.genreState,
  artists:req.body.artistState,
  country:req.body.profileState[0],
  email:req.body.profileState[1],
  spotify_id:req.body.profileState[2],
  spotify_display_name:req.body.profileState[3],
  profile_pic:req.body.profileState[4]
}) 
try {
  const newUser = await user.save()
  res.status(201).json(newUser)
} catch (err) {
  res.status(400).json({ message: err.message });
}
}

export const addSpotifyData = async (req, res) => {
  console.log(req.body.userInfo)
  const data = req.body.userInfo
  const country = data[0]
  const email = data[1]
  const spotifyId = data[2]
  const spotifyDisplayName = data[3]
  console.log(data[0])

  const user = new User({
    spotify_id: spotifyId,
    email: email,
    spotify_display_name:spotifyDisplayName,
    country:country
    
  }) 
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const createSpotifyUser = async (req, res) => {

  console.log('test')
  

  // const user = new User({
  //   spotify_id: spotifyId,
  //   email: email,
  //   spotify_display_name:spotifyDisplayName,
  //   country:country
    
  // }) 
  // try {
  //   const newUser = await user.save()
  //   res.status(201).json(newUser)
  // } catch (err) {
  //   res.status(400).json({ message: err.message });
  // }
}

export const addSpotifyArtists = async (req, res) => {
  console.log(req.body)
  const user = new User({
    user_info:req.body.userInfo
  }) 
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const record = async (req, res) => {
  try{
    const trial = await Trial.find()
    res.json(trial)
  } catch (err) {}
}

export const databaseLookup = async (req, res) => {
  // console.log('backend working')
  // const searchTerm = req.query.keyword
  // console.log(`${searchTerm} is the searchTerm`)
  // console.log('Request query:', req.query.keyword);
  // if (!searchTerm) {
  //   return res.status(400).json({ error: 'Missing keyword parameter' });
  // }

  // const result = await User.find({ spotify_id: searchTerm })
  // res.json(result[0])

console.log('backend working')
const searchTerm = req.query.keyword
try {
  const existingUser = await User.findOne({ spotify_id: searchTerm })
  if(!existingUser) {
    console.log('not found')
    res.json('not found')
  } else {
    res.json('found')
  }
} catch {
  console.error(error)
}

}

export const makeAUser = async (req, res) => {
  // res.send("Hello from the 'test' URL");
  req.session.username = req.body.username;
  res.end()
}

export const getSingleUser = async (req, res) => {
  const user = req.query.keyword
  console.log(`backend working for ${user}`)
    try {
      const searchedUser = await User.findOne({ email: user})
      console.log(searchedUser)
      res.json({searchedUser})
      if(!user) {
        console.log('error')
      }
    } catch {
      console.error(req.error)
    }
  
}


export const getUsers = async (req, res) => {
  try {
      const allUsers = await User.find();
      // const usersFound = res.json({users: allUsers });
      console.log(allUsers)
      res.json({users: allUsers})
      
    } catch (error) {
      console.error('Error fetching users:', error );
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const like = async (req, res) => {
  const likedUserId = req.body.likedUserId;
   const likingUserId = req.body.liker;
  console.log(`${likingUserId} likes ${likedUserId}`)

// add db functionality

try {
const likingUser = await User.findById(likingUserId);
if (!likingUser) {
  return res.status(404).json({ error: 'Liking user not found' });
}
 // Add the liked user to the likedUsers array
 likingUser.likedUsers.push(likedUserId);

 // Save the changes
 await likingUser.save();
 console.log(likingUser.likedUsers)

 res.status(200).json({ message: 'User liked successfully' });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Server error' });
}

}
export const registerUser = asyncHandler(async (req, res) => {
  console.log('42')
  const { loginName, email, pass } = req.body;
  console.log(req.body)
  const userExists = await User.findOne({email})
  if (userExists){
    res.status(400)
    throw new Error("User already exists")
  }

  const user = await User.create({
    loginName, email,
    password: pass
  })
  console.log(user)

  if(user) {
    res.status(201).json({
      _id:user._id,
      loginName:user.loginName,
      email:user.email,
      password:user.password,
      token:generateToken(user._id),
    })
  }
 


})

export const backendLogin = asyncHandler(async (req, res) => {
  console.log('42')
  const { name, email, pass, pic } = req.body;
  console.log(req.body)
  const user = await User.findOne({email})
  console.log(user)

  if (user && (await user.matchPassword(pass))){
    res.status(201).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      pass:user.pass,
      pic:user.pic,
      token:generateToken(user._id),
    })
  } else{
    res.status(400)
    throw new Error("Invalid email or password")
  }
})


export const getMatches = async (req, res) => {
  console.log('getting user connected')
  const { userId } = req.params
    console.log(userId) 
  try{
    const user = await User.findById(userId).populate('likedUsers').populate('likedBy')
    const matches = user.likedUsers.filter(likedUser => 
      likedUser.likedUsers.some(likedByUser => likedByUser.equals(userId))
    );
    console.log(matches)
    res.json({ matches })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'server error' })
  }
}


//search for user
//if user is found, return found
//if user is not found return notFound