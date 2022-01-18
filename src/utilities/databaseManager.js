import SQLite from "react-native-sqlite-2";
import { crypto } from './crypto';
/**
 * Database Manager
 * 
 */
const db = SQLite.openDatabase("ehealth.db", "1.0", "", 1);

const setDatabaseConfiguration = async () => {
    return await db.transaction(async (txn) => {
        await txn.executeSql("CREATE TABLE IF NOT EXISTS Que(que TEXT)", []);
        await txn.executeSql("CREATE TABLE IF NOT EXISTS State(state TEXT)", []);
        await txn.executeSql("CREATE TABLE IF NOT EXISTS District(district TEXT)", []);
        await txn.executeSql("CREATE TABLE IF NOT EXISTS City(city TEXT)", []);
        await txn.executeSql("CREATE TABLE IF NOT EXISTS Ans(ans TEXT)", []);
        return await txn.executeSql("CREATE TABLE IF NOT EXISTS User(user TEXT)", []);
    });
};


const insertUserRecords = async (data) => {
    return await db.transaction(async (tx) => {
        return await tx.executeSql('INSERT INTO User (user) values (:user)', [crypto.encrypt(data)]);
    })
}

const insertQueRecords = async (data) => {
    return await db.transaction(async (tx) => {
        return await tx.executeSql('INSERT INTO Que (que) values (:que)', [crypto.encrypt(data)]);
    })
}

const insertStateRecords = async (data) => {
    return await db.transaction(async (tx) => {
        return await tx.executeSql('INSERT INTO State (state) values (:state)', [JSON.stringify(data)]);
    })
}
const insertDistrictRecords = async (data) => {
    return await db.transaction(async (tx) => {
        return await tx.executeSql('INSERT INTO District (district) values (:district)', [JSON.stringify(data)]);
    })
}
const insertCityRecords = async (data) => {
    return await db.transaction(async (tx) => {
        return await tx.executeSql('INSERT INTO City (city) values (:city)', [JSON.stringify(data)]);
    })
}
const insertAnsRecords = async (data) => {
    return await db.transaction(async (tx) => {
        return await tx.executeSql('INSERT INTO Ans (ans) values (:ans)', [crypto.encrypt(data)]);
    })
}

const deleteUserRecords = async () => {
    return await db.transaction(async (tx) => {
        return await tx.executeSql('DELETE FROM User');
    })
}

const deleteQueRecords = async () => {
    return await db.transaction(async (tx) => {
        return await tx.executeSql('DELETE FROM Que');
    })
}

const deleteStateRecords = async () => {
    return await db.transaction(async (tx) => {
        return await tx.executeSql('DELETE FROM State');
    })
}

const deleteDistrictRecords = async () => {
    return await db.transaction(async (tx) => {
        return await tx.executeSql('DELETE FROM District');
    })
}

const deleteCityRecords = async () => {
    return await db.transaction(async (tx) => {
        return await tx.executeSql('DELETE FROM City');
    })
}

const deleteAnsRecords = async () => {
    return await db.transaction(async (tx) => {
        return await tx.executeSql('DELETE FROM Ans');
    })
}

const fetchUserRecords = async () => {
    return await new Promise(async (resolve) => {
        await db.transaction(async (tx) => {
            await tx.executeSql('SELECT user FROM User', [], async (txId, res) => {
                let items = [];
                for (let i = 0; i < res.rows.length; ++i) {
                    items.push(crypto.decrypt(res.rows.item(i).user))
                }
                return resolve(items);
            });
        });
    });

}

const fetchQueRecords = async () => {
    return await new Promise(async (resolve) => {
        await db.transaction(async (tx) => {
            await tx.executeSql('SELECT que FROM Que', [], async (txId, res) => {
                let items = [];
                for (let i = 0; i < res.rows.length; ++i) {
                    items.push(crypto.decrypt(res.rows.item(i).que))
                }
                return resolve(items);
            });
        });
    });

}
const fetchStateRecords = async () => {
    return await new Promise(async (resolve) => {
        await db.transaction(async (tx) => {
            await tx.executeSql('SELECT state FROM State', [], async (txId, res) => {
                let items = [];
                for (let i = 0; i < res.rows.length; ++i) {
                    items.push(res.rows.item(i).state)
                }
                return resolve(items);
            });
        });
    });

}
const fetchDistrictRecords = async () => {
    return await new Promise(async (resolve) => {
        await db.transaction(async (tx) => {
            await tx.executeSql('SELECT district FROM District', [], async (txId, res) => {
                let items = [];
                for (let i = 0; i < res.rows.length; ++i) {
                    items.push(res.rows.item(i).district)
                }
                return resolve(items);
            });
        });
    });

}
const fetchCityRecords = async () => {
    return await new Promise(async (resolve) => {
        await db.transaction(async (tx) => {
            await tx.executeSql('SELECT city FROM City', [], async (txId, res) => {
                let items = [];
                for (let i = 0; i < res.rows.length; ++i) {
                    items.push(res.rows.item(i).city)
                }
                return resolve(items);
            });
        });
    });

}

const fetchAnsRecords = async () => {
    return await new Promise(async (resolve) => {
        await db.transaction(async (tx) => {
            await tx.executeSql('SELECT ans FROM Ans', [], async (txId, res) => {
                let items = [];
                for (let i = 0; i < res.rows.length; ++i) {
                    items.push(crypto.decrypt(res.rows.item(i).ans))
                }
                return resolve(items);
            });
        });
    });

}


export const DatabaseManager = {
    setDatabaseConfiguration,
    insertUserRecords,
    fetchUserRecords,
    deleteUserRecords,
    insertQueRecords,
    fetchQueRecords,
    deleteQueRecords,
    insertStateRecords,
    fetchStateRecords,
    deleteStateRecords,
    insertDistrictRecords,
    fetchDistrictRecords,
    deleteDistrictRecords,
    insertCityRecords,
    fetchCityRecords,
    deleteCityRecords,
    insertAnsRecords,
    fetchAnsRecords,
    deleteAnsRecords
}