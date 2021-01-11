import * as React from "react";
import { Button, View, Text } from "react-native";
import { ProgressBar, Colors, List, Card } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteID } from "../actions/movieIDs";
import { addMovieStyles as styles } from "../themes/styles";
import secrets from "../../secrets";
import { NativeSyntheticEvent } from "react-native";
import { NativeTouchEvent } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Director: string;
  imdbRating: string;
  displayMov: boolean;
}

// TODO: Implement this function instead of getMovies()

// function getMovie(imdb: string): Promise<Movie> {
//   let fetchurl: string = `http://www.omdbapi.com/?apikey=${secrets.OMDBkey}&i=${imdb}`;
//   return fetch(fetchurl)
//     .then((res) => res.json())
//     .then((res) => {
//       return res as Movie;
//     });
// }

const AddMovies = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);

  const dispatch = useDispatch();

  const deleteMovieID = (id: string) => {
    dispatch(deleteID(id));
  };

  const movieIDs: string[] = useSelector(function (state) {
    return state.idReducer.movieIDs;
  });

  function getMovies(idArr: string[]) {
    var promises: any = [];
    let movieArr: Array<Movie> = [];
    idArr.forEach((id) => {
      let fetchurl: string = `http://www.omdbapi.com/?apikey=${secrets.OMDBkey}&i=${id}`;

      promises.push(
        fetch(fetchurl)
          .then((res) => res.json())
          .then((res) => {
            movieArr.push(res);
          })
      );
    });

    Promise.all(promises).then(() => {
      setMovies(movieArr);
    });
  }

  React.useEffect(() => {
    getMovies(movieIDs);
  }, [movieIDs]);

  const onPressRemove = (_: any, imdb: string) => {
    deleteMovieID(imdb);
  };

  const onDonePress = (_: any) => {
    return (
      <ConfettiCannon
        count={200}
        origin={{ x: 270, y: 0 }}
        explosionSpeed={200}
        fadeOut={true}
      />
    );
  };

  return (
    <View>
      <Card style={styles.card}>
        <Text style={styles.mainText}>
          2. Add Movies and Shows to Your Watchlist
        </Text>
        <ProgressBar
          progress={movieIDs.length / 5}
          color={Colors.red800}
          style={styles.progressBar}
        />
        {movies.map((movie, i) => (
          <View key={i}>
            {movieIDs.includes(movie.imdbID) && (
              <List.Item
                title={`${movie.Title} (${movie.Year})`}
                description={`Directed by: ${movie.Director}`}
                key={i}
                right={(props) => (
                  <View style={styles.movieButton}>
                    <Button
                      {...props}
                      title={"Remove"}
                      onPress={(ev: NativeSyntheticEvent<NativeTouchEvent>) =>
                        onPressRemove(ev, movie.imdbID)
                      }
                    />
                  </View>
                )}
              />
            )}
          </View>
        ))}
        {movieIDs.length == 5 && (
          <View>
            <ConfettiCannon
              count={200}
              origin={{ x: 270, y: 0 }}
              explosionSpeed={700}
              fadeOut={true}
            />
            <Card style={styles.maxCard}>
              <Text style={styles.maxText}>Added 5 Movies/Shows!</Text>
            </Card>
          </View>
        )}
      </Card>
    </View>
  );
};

export default AddMovies;
