import fs from 'fs';

const path = 'logs/alpha-algorithm.log';

// eslint-disable-next-line
export const logging = (data: any): boolean => {
    // 追記モードでファイルを開く
    const writeStream = fs.createWriteStream(path, {
        flags: 'a',
    });

    // ファイルにデータを書き込む
    writeStream.write(JSON.stringify(data) + '\n', error => {
        if (error) {
            console.error('Write by logger failed.', error);
        }
        // ストリームを閉じる
        writeStream.end();
    });
    return true;
};
