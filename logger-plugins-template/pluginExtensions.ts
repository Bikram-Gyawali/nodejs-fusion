const consoleLoggerPlugin = {
    name: 'console-logger',
    version: '1.0.0',
    hooks: {
      'onLog': async (level, message) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${level}: ${message}`);
      }
    }
  };
  
  // File Logger Plugin
  const fileLoggerPlugin = {
    name: 'file-logger',
    version: '1.0.0',
    initialize: async () => {
      // Setup file handles, create directories, etc.
      await fs.promises.mkdir('./logs', { recursive: true });
    },
    shutdown: async () => {
      // Close file handles, etc.
    },
    hooks: {
      'onLog': async (level, message) => {
        const timestamp = new Date().toISOString();
        const logLine = `[${timestamp}] ${level}: ${message}\n`;
        await fs.promises.appendFile('./logs/app.log', logLine);
      }
    }
  };
  
  // Slack Notification Plugin (for error logs only)
  const slackNotifierPlugin = {
    name: 'slack-notifier',
    version: '2.0.0',
    initialize: async () => {
      // Initialize Slack client
    },
    hooks: {
      'onLog': async (level, message) => {
        if (level === 'ERROR') {
          // Send to Slack (implementation omitted for brevity)
          await sendToSlack(`🚨 Error: ${message}`);
        }
      }
    }
  };