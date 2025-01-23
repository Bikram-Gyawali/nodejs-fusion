async function main() {
    // Create plugin manager instance
    const pluginManager = new PluginManager();
    
    // Register plugins
    await pluginManager.registerPlugin(consoleLoggerPlugin);
    await pluginManager.registerPlugin(fileLoggerPlugin);
    await pluginManager.registerPlugin(slackNotifierPlugin);
    
    // Create a logging function that uses the plugins
    async function log(level, message) {
      await pluginManager.executeHook('onLog', level, message);
    }
    
    // Example usage
    await log('INFO', 'Application started');
    await log('ERROR', 'Failed to connect to database');
    
    // List all registered plugins
    console.log('Registered plugins:', pluginManager.listPlugins());
    
    // Cleanup
    await pluginManager.unregisterPlugin('slack-notifier');
  }
  
  main().catch(console.error);