import NewLogForm from "@/components/log/NewLogForm";
import { getById } from "@/models/Streak";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const streak = await getById(id);
  const { unit, interval } = JSON.parse(
    JSON.parse(streak.config.repeatInterval as string)
  );
  return (
    <div>
      <h1>Streak: {streak.name}</h1>
      <p>description: {streak.description}</p>
      <p>{`repeats every ${interval} ${unit}`}</p>
      <h2>Fields:</h2>
      <ul>
        {streak.config.fields.map((fields) => {
          return (
            <li>
              <h3>{`${fields.name} (${fields.type})`}</h3>
              <p>{fields.description}</p>
              {fields.required && <p>Required</p>}
            </li>
          )
        })}
      </ul>
      <hr />
      <NewLogForm fields={streak.config.fields} />
    </div>
  );
};