import {
  Client,
  ActionRowBuilder,
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  InteractionType,
  SelectMenuBuilder,
} from 'discord.js';

// enum EmbedColor {
//   Primary = "#007bff",
//   Info = "#17a2b8",
//   Success = "#28a745",
//   Warning = "#ffc107",
//   Danger = "#dc3545",
// }

export const command = new SlashCommandBuilder()
  .setName('announce')
  .setDescription('Новий анонс.');

export function init(client: Client) {
  client.on('interactionCreate', async (interaction) => {
    // Command.
    if (
      interaction.type == InteractionType.ApplicationCommand &&
      interaction.commandName === command.name
    ) {
      // Create the modal
      const modal = new ModalBuilder()
        .setCustomId(command.name)
        .setTitle(command.description);

      // Add inputs to the modal
      modal.addComponents(
        // @ts-ignore
        new ActionRowBuilder().addComponents(
          new SelectMenuBuilder()
            .setCustomId('day')
            .setPlaceholder('День гри')
            .addOptions(
              {
                label: 'Сьогодні',
                description: '2022-08-04',
                value: 'today',
              },
              {
                label: 'Завтра',
                description: '2022-08-05',
                value: 'tomorrow',
              },
              {
                label: 'Післязавтра',
                description: '2022-08-06',
                value: 'day-after-tomorrow',
              },
            ),
        ),

        new ActionRowBuilder().addComponents(
          new SelectMenuBuilder()
            .setCustomId('time')
            .setPlaceholder('Час гри')
            .addOptions(
              {
                label: '18:00',
                value: 'time1800',
              },
              {
                label: '18:30',
                value: 'time1830',
              },
              {
                label: '19:00',
                value: 'time1900',
              },
              {
                label: '19:30',
                value: 'time1930',
              },
            ),
        ),

        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('description')
            .setLabel('Опис гри:')
            .setStyle(TextInputStyle.Paragraph),
        ),
      );

      // Show the modal to the user
      await interaction.showModal(modal);
    }

    if (interaction.type == InteractionType.ModalSubmit) {
      console.log(interaction);
    }
  });
}
