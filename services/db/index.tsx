import * as React from "react";
import * as SQLite from "expo-sqlite";

const TracksDb = SQLite.openDatabase("Correiotrack");

function execute(description: string, query: string) {
  TracksDb.transaction(
    (tx) => {
      tx.executeSql(query);
    },
    (error) => {
      console.log(description, error);
    },
    () => {
      console.log(description + " sucesso");
    }
  );
}

execute("drop tracks", "drop table tracks");
execute("drop tracks_logs", "drop table tracks_logs");

execute(
  "create tracks",
  "create table if not exists `tracks` (`id` integer primary key not null, `code` TEXT, `description` TEXT, 'delivered' INTEGER, createDate TEXT, lastUpdateDate TEXT)"
);
execute(
  "create tracks_logs",
  "create table if not exists `tracks_logs` (`id` integer primary key not null, `code` TEXT, `dateTime` TEXT, `description` TEXT, `locale` TEXT, `localeDetails` TEXT)"
);

export default TracksDb;
