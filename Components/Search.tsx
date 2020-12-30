import { setStatusBarTranslucent } from "expo-status-bar";
import * as React from "react";
import { Button, Text, View } from "react-native";
import { Searchbar, ProgressBar, Colors, List } from "react-native-paper";
import { Item } from "react-native-paper/lib/typescript/components/List/List";

let OMDBkey: string = "346ff3a2";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface APIResponse {
  Search: Movie[];
  totalResults: string;
  Resposne: string;
}

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

  const onChangeSearch = (query: any) => {
    getMovies(query).then((moviesArr) => {
      moviesArr = moviesArr.filter((obj) => obj.Type === "movie");
      setMovies(moviesArr);
    });

    setSearchQuery(query);
  };

  const onButtonPress = () => {
    setProgress(progress + 1);
  };

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Button title="Click ME" onPress={onButtonPress} />
      <ProgressBar progress={progress / 5} color={Colors.red800} />
      <Text>{searchQuery}</Text>
      <View>
        {movies.map((movie, i) => (
          <List.Item title={movie.Title} description={movie.Year} key={i} />
        ))}
      </View>
    </View>
  );
};

export default Search;
