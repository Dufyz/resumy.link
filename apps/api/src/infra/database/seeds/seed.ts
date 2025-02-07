import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.transaction(async (trx) => {
    // Inserindo na tabela users e armazenando o ID gerado
    const [{ id: userId }] = await trx("users")
      .insert({
        name: "Guilherme Iago Schmidt Thomaz",
        email: "guilhermeiagothomaz@hotmail.com",
        created_at: "2025-02-06 17:51:44.514",
        updated_at: "2025-02-06 17:51:44.514",
      })
      .returning("id");

    // Inserindo na tabela portfolios e armazenando o ID gerado
    const [{ id: portfolioId }] = await trx("portfolios")
      .insert({
        user_id: userId, // Usando o ID gerado para users
        username: "dufyz",
        title: "Guilherme Iago Schmidt Thomaz",
        bio: null,
        avatar_path: null,
        metadata: JSON.stringify({
          links: [
            { url: "https://dufyz.dev/", type: "website" },
            {
              url: "https://www.instagram.com/schmidt_iago",
              type: "instagram",
            },
          ],
        }),
        created_at: "2025-02-06 17:41:01.378",
        updated_at: "2025-02-06 17:41:18.750",
      })
      .returning("id");

    // Inserindo na tabela portfolio_sections e armazenando os IDs gerados
    const sectionIds = await trx("portfolio_sections")
      .insert([
        {
          portfolio_id: portfolioId,
          is_active: true,
          type: "education",
          title: "Educação",
          created_at: "2025-02-06 17:41:21.219",
          updated_at: "2025-02-06 17:41:21.219",
        },
        {
          portfolio_id: portfolioId,
          is_active: true,
          type: "certification",
          title: "Certificação",
          created_at: "2025-02-06 17:41:26.070",
          updated_at: "2025-02-06 17:41:26.070",
        },
        {
          portfolio_id: portfolioId,
          is_active: true,
          type: "experience",
          title: "Experiência",
          created_at: "2025-02-06 17:41:29.076",
          updated_at: "2025-02-06 17:41:29.076",
        },
      ])
      .returning(["id", "type"]);

    // Mapeando os IDs das seções
    const sectionMap = Object.fromEntries(
      sectionIds.map(({ id, type }) => [type, id])
    );

    // Inserindo os itens da seção
    await trx("portfolio_section_items").insert([
      {
        portfolio_id: portfolioId,
        portfolio_section_id: sectionMap["education"],
        is_active: true,
        metadata: JSON.stringify({
          type: "education",
          title: "Engenharia de Software",
          end_date: null,
          start_date: "2023-03-01T00:00:00.000Z",
          description: "",
          organization: "Universidade Federal de Goiás",
        }),
        created_at: "2025-02-06 17:42:03.582",
        updated_at: "2025-02-06 17:42:03.582",
      },
      {
        portfolio_id: portfolioId,
        portfolio_section_id: sectionMap["certification"],
        is_active: true,
        metadata: JSON.stringify({
          type: "certification",
          title: "Amazon Web Services Cloud Practitioner",
          end_date: "2026-09-01T00:00:00.000Z",
          start_date: "2023-09-01T00:00:00.000Z",
          description: "",
          organization: "Amazon Web Services",
        }),
        created_at: "2025-02-06 17:43:25.159",
        updated_at: "2025-02-06 17:43:25.159",
      },
      {
        portfolio_id: portfolioId,
        portfolio_section_id: sectionMap["experience"],
        is_active: true,
        metadata: JSON.stringify({
          type: "experience",
          title: "Junior Software Engineer",
          end_date: "2025-01-20T00:00:00.000Z",
          start_date: "2023-10-01T00:00:00.000Z",
          description: "",
          organization: "Hyerdev",
        }),
        created_at: "2025-02-06 17:44:25.663",
        updated_at: "2025-02-06 17:44:25.663",
      },
    ]);
  });
}
