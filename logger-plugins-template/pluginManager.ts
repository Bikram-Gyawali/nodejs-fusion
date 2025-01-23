class PluginManager {
  #plugins = new Map();
  #hooks = new Map();

  async registerPlugin(plugin) {
    // Validate plugin structure
    if (!plugin.name || !plugin.version) {
      throw new Error("Plugin must have name and version properties");
    }

    if (this.#plugins.has(plugin.name)) {
      throw new Error(`Plugin ${plugin.name} is already registered`);
    }

    // Initialize plugin if needed
    if (typeof plugin.initialize === "function") {
      try {
        await plugin.initialize();
      } catch (error) {
        throw new Error(
          `Failed to initialize plugin ${plugin.name}: ${error.message}`
        );
      }
    }

    // Register plugin hooks
    for (const [hookName, hookFn] of Object.entries(plugin.hooks || {})) {
      if (!this.#hooks.has(hookName)) {
        this.#hooks.set(hookName, new Set());
      }
      this.#hooks.get(hookName).add(hookFn);
    }

    this.#plugins.set(plugin.name, plugin);
    console.log(
      `Plugin ${plugin.name} v${plugin.version} registered successfully`
    );
  }

  async executeHook(hookName, ...args) {
    const hooks = this.#hooks.get(hookName);
    if (!hooks) {
      return [];
    }

    const results = [];
    for (const hook of hooks) {
      try {
        const result = await hook(...args);
        results.push(result);
      } catch (error) {
        console.error(`Error executing hook ${hookName}: ${error.message}`);
        results.push(null);
      }
    }
    return results;
  }

  async unregisterPlugin(pluginName) {
    const plugin = this.#plugins.get(pluginName);
    if (!plugin) {
      throw new Error(`Plugin ${pluginName} is not registered`);
    }

    // Remove plugin hooks
    for (const [hookName, hooks] of this.#hooks.entries()) {
      for (const hookFn of Object.values(plugin.hooks || {})) {
        hooks.delete(hookFn);
      }
      if (hooks.size === 0) {
        this.#hooks.delete(hookName);
      }
    }

    // Shutdown plugin if needed
    if (typeof plugin.shutdown === "function") {
      try {
        await plugin.shutdown();
      } catch (error) {
        console.error(
          `Error shutting down plugin ${pluginName}: ${error.message}`
        );
      }
    }

    this.#plugins.delete(pluginName);
    console.log(`Plugin ${pluginName} unregistered successfully`);
  }

  getPlugin(pluginName) {
    return this.#plugins.get(pluginName);
  }

  listPlugins() {
    return Array.from(this.#plugins.entries()).map(([name, plugin]) => ({
      name,
      version: plugin.version,
    }));
  }
}
