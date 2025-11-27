(function() {
  // Called once when the viz is first created
  const vizDefinition = {
    id: 'wso2_help_tooltip',
    create: function(element, config) {
      // Create container
      const container = document.createElement('div');
      container.style.position = 'relative';
      container.style.display = 'inline-block';
      container.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      container.style.cursor = 'help';
      container.style.userSelect = 'none';

      // Icon
      const icon = document.createElement('div');
      icon.textContent = '?';
      icon.style.width = '20px';
      icon.style.height = '20px';
      icon.style.borderRadius = '50%';
      icon.style.border = '1px solid rgba(0,0,0,0.2)';
      icon.style.display = 'flex';
      icon.style.alignItems = 'center';
      icon.style.justifyContent = 'center';
      icon.style.fontSize = '12px';
      icon.style.backgroundColor = '#ffffff';
      icon.style.color = '#666666';
      icon.style.boxShadow = '0 1px 2px rgba(0,0,0,0.08)';

      // Tooltip
      const tooltip = document.createElement('div');
      tooltip.style.position = 'absolute';
      tooltip.style.minWidth = '220px';
      tooltip.style.maxWidth = '280px';
      tooltip.style.padding = '8px 10px';
      tooltip.style.borderRadius = '6px';
      tooltip.style.backgroundColor = 'rgba(38,38,38,0.96)';
      tooltip.style.color = '#ffffff';
      tooltip.style.fontSize = '11px';
      tooltip.style.lineHeight = '1.4';
      tooltip.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
      tooltip.style.top = '26px';
      tooltip.style.right = '0px';
      tooltip.style.zIndex = '9999';
      tooltip.style.opacity = '0';
      tooltip.style.pointerEvents = 'none';
      tooltip.style.transition = 'opacity 0.12s ease-out';

      // Default text – will be overwritten on data update
      tooltip.textContent = 'No tooltip text configured. Bind a text field called "Tooltip Text".';

      container.appendChild(icon);
      container.appendChild(tooltip);
      element.appendChild(container);

      // Hover behaviour
      icon.addEventListener('mouseover', () => {
        tooltip.style.opacity = '1';
      });

      icon.addEventListener('mouseout', () => {
        tooltip.style.opacity = '0';
      });

      // Store in element for later updates
      element._tooltipEl = tooltip;
    },

    // Called whenever data / style / size changes
    update: function(element, data, config) {
      const tooltip = element._tooltipEl;
      if (!tooltip) return;

      // Expecting a single dimension: Tooltip Text
      try {
        const rows = (data && data.tables && data.tables.DEFAULT) ? data.tables.DEFAULT.rows : [];
        if (rows.length > 0 && rows[0].dim && rows[0].dim.length > 0) {
          const text = rows[0].dim[0];
          tooltip.textContent = text || ' ';
        }
      } catch (e) {
        // Fail silently; do not log or export anything
        tooltip.textContent = 'Tooltip text could not be read.';
      }
    }
  };

  // Register with Looker Studio
  // google is injected by Looker Studio at runtime
  // eslint-disable-next-line no-undef
  google.datastudio.visualization.register(vizDefinition);
})();
