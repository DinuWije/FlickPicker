import * as React from "react";
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  Button,
  View,
  Text,
} from "react-native";
import { Searchbar, List, Card } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addID } from "../actions/movieIDs";
import { searchStyles as styles } from "../themes/styles";
import secrets from "../../secrets";
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  ButtonTitle: string;
  disabled: boolean;
  icon: string;
}

function getMovies(title: string): Promise<Movie[]> {
  const searchTitle = title.replace(/\s/g, "+");
  let fetchurl: string = `http://www.omdbapi.com/?apikey=${secrets.OMDBkey}&s=${searchTitle}`;
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
  const [searchQuery, setSearchQuery] = React.useState("");

  const dispatch = useDispatch();

  const addNewId = (id: string) => dispatch(addID(id));

  const updateMovies = (movieIDarr: any) => {
    const imdbIDs = new Set(movieIDarr);
    getMovies(searchQuery).then((moviesArr) => {
      moviesArr = moviesArr.filter(
        (movie) => movie.Type === "movie" || movie.Type === "series"
      );
      moviesArr.forEach(function (movie) {
        if (imdbIDs.has(movie.imdbID)) {
          movie.disabled = true;
          movie.ButtonTitle = "Added!";
          if (movie.Type === "series") {
            movie.icon = "television-classic";
          } else {
            movie.icon = "filmstrip";
          }
        } else {
          if (imdbIDs.size >= 5) {
            movie.disabled = true;
            movie.ButtonTitle = "Max 5";
            if (movie.Type === "series") {
              movie.icon = "television-classic";
            } else {
              movie.icon = "filmstrip";
            }
          } else {
            movie.disabled = false;
            if (movie.Type === "series") {
              movie.ButtonTitle = "Add Show";
              movie.icon = "television-classic";
            } else {
              movie.ButtonTitle = "Add Movie";
              movie.icon = "filmstrip";
            }
          }
        }
      });
      setMovies(moviesArr);
    });
  };


  const movieIDs: string[] = useSelector((state) => {
    let movieIDarr: string[] = state.idReducer.movieIDs;
    updateMovies(movieIDarr);
    return movieIDarr;
  });


  const onChangeSearch = (query: any) => {
    setSearchQuery(query);
  };

  const onPressMovie = (_: any, imdb: string, i: number) => {
    const imdbIDs = new Set(movieIDs);

    addNewId(imdb);

    imdbIDs.add(imdb);

    const newArr: Array<Movie> = [];
    movies.forEach((val) => newArr.push(Object.assign({}, val)));
    newArr[i].disabled = true;
    newArr[i].ButtonTitle = "Added!";
    setMovies(newArr);
  };

  return (
    <View>
      <Card style={styles.card}>
        <Text style={styles.mainText}>1. Search For Movies and TV Shows</Text>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        <View>
          {movies.map((movie, i) => (
            <List.Item
              title={movie.Title}
              description={movie.Year}
              key={movie.imdbID}
              style={styles.listItem}
              left={(props) => <List.Icon {...props} icon={movie.icon} />}
              right={(props) => (
                <View style={styles.movieButton}>
                  <Button
                    {...props}
                    title={movie.ButtonTitle}
                    onPress={(ev: NativeSyntheticEvent<NativeTouchEvent>) =>
                      onPressMovie(ev, movie.imdbID, i)
                    }
                    disabled={movie.disabled}
                  />
                </View>
              )}
            />
          ))}
        </View>
      </Card>
    </View>
  );
};

export default Search;
