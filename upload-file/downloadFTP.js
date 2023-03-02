const ftp = require('basic-ftp')

async function downloadFileFromFTP(localFile, remotePath) {
  const client = new ftp.Client()

  try {
    await client.access({
      host: '',
      user: 'bigram',
      password: 'bigram', //bigRAM
      secure: true,
    })

    // download the remote file located to remotePath
    // and store it to localFile
    await client.downloadTo(localFile, remotePath)
  } catch (err) {
    console.log(err)
  }
  client.close()
}

// download the remote file "reports/CSV/data.csv"
// and store it to the local file "data.csv"
downloadFileFromFTP('data.csv', 'reports/CSV/data.csv')
