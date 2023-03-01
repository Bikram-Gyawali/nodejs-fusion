const ftp = require('basic-ftp')

async function downloadFileFromFTP(localFile, remotePath) {
  const client = new ftp.Client()

  try {
    await client.access({
      host: '<YOUR_FTP_HOST>',
      user: '<YOUR_FTP_USER>',
      password: '<YOUR_FTP_USER_PASSWORD>', //bigRAM
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
