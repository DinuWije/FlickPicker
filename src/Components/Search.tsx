import * as React from "react";
import { NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import { Button, View, StyleSheet } from "react-native";
import { Searchbar, ProgressBar, Colors, List } from "react-native-paper";
import { connect, useDispatch, useSelector } from "react-redux";
import { addID, deleteID } from "../actions/movieIDs";

let OMDBkey: string = "346ff3a2";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  ButtonTitle: string;
  disabled: boolean;
}

const styles = StyleSheet.create({
  searchbar: {
    minWidth: 500,
    marginTop: 20,
  },
  movieButton: {
    maxHeight: 10,
    justifyContent: "center",
    marginTop: 20,
    minWidth: 100,
  },
});

function getMovies(title: string): Promise<Movie[]> {
  const searchTitle = title.replace(/\s/g, "+");
  let fetchurl: string = `http://www.omdbapi.com/?apikey=${OMDBkey}&s=${searchTitle}`;
  return fetch(fetchurl)
    .then((res) => res.json())
    .then((res) => {
      if (res["Response"] == "True") {
        return res["Search"] as Movie[];
      }
      return [] as Movie[];
    });
}

const Search = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState("");

  const dispatch = useDispatch();

  const addNewId = (id: string) => dispatch(addID(id));

  const movieIDs: string[] = useSelector((state) => state.idReducer.movieIDs);

  const onChangeSearch = (query: any) => {
    setSearchQuery(query);

    //TODO: Take button Press Logic here (remember to swap searchQuery with query in getMovies() func)
  };

  const onButtonPress = () => {
    const imdbIDs = new Set(movieIDs);
    getMovies(searchQuery).then((moviesArr) => {
      moviesArr = moviesArr.filter((movie) => movie.Type === "movie");
      moviesArr.forEach(function (movie) {
        if (imdbIDs.has(movie.imdbID)) {
          movie.disabled = true;
          movie.ButtonTitle = "Added!";
        } else {
          movie.ButtonTitle = "Add Movie";
        }
      });
      setMovies(moviesArr);
    });
  };

  const onPressMovie = (_: any, imdb: string, i: number, movie: Movie) => {
    setProgress(progress + 1);

    const imdbIDs = new Set(movieIDs);

    if (!imdbIDs.has(imdb)) {
      addNewId(imdb);
    }

    imdbIDs.add(imdb);

    const newArr: Array<Movie> = [];
    movies.forEach((val) => newArr.push(Object.assign({}, val)));
    newArr[i].disabled = true;
    newArr[i].ButtonTitle = "Added!";
    setMovies(newArr);
  };

  console.log(movieIDs);

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <Button title="Click ME" onPress={onButtonPress} />
      <ProgressBar progress={progress / 5} color={Colors.red800} />
      <View>
        {movies.map((movie, i) => (
          <List.Item
            title={movie.Title}
            description={movie.Year}
            key={movie.imdbID}
            left={(props) => <List.Icon {...props} icon="folder" />}
            right={(props) => (
              <View style={styles.movieButton}>
                <Button
                  {...props}
                  title={movie.ButtonTitle}
                  onPress={(ev: NativeSyntheticEvent<NativeTouchEvent>) =>
                    onPressMovie(ev, movie.imdbID, i, movie)
                  }
                  disabled={movie.disabled}
                />
              </View>
            )}
          />
        ))}
      </View>
    </View>
  );
};

export default Search;
