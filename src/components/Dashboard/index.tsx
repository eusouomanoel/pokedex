import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Pokemon } from "../../services/interface";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getTypesPokemons } from "../../services/api";

interface Props {
  allPokemons: Pokemon[];
}
interface TypeCount {
  name: string;
  quantidade: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard = ({ allPokemons }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [types, setTypes] = useState<any>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getTypesPokemons().then((data) => {
        setTypes(data);
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  function calculateAverage(allPokemons: Pokemon[], property: keyof Pokemon) {
    const total = allPokemons.reduce((acc, pokemon) => {
      return acc + Number(pokemon[property]);
    }, 0);
    return total / allPokemons.length;
  }

  const averageAttack = calculateAverage(allPokemons, "atk");
  const averageDefense = calculateAverage(allPokemons, "def");
  const averageSpeed = calculateAverage(allPokemons, "hp");

  if (!allPokemons && isLoading) {
    return <p>Loading...</p>;
  }

  const data = {
    labels: types.map((type: any) => {
      return type["typeName"].toUpperCase();
    }),

    datasets: [
      {
        label: "Pokemons",

        data: types
          .sort((a: TypeCount, b: TypeCount) => b.quantidade - a.quantidade)
          .map((type: any) => {
            return type["quantidade"];
          }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 71, 0.2)",
          "rgba(255, 165, 0, 0.2)",
          "rgba(255, 215, 0, 0.2)",
          "rgba(50, 205, 50, 0.2)",
          "rgba(0, 128, 0, 0.2)",
          "rgba(0, 0, 255, 0.2)",
          "rgba(128, 0, 128, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 71, 1)",
          "rgba(255, 165, 0, 1)",
          "rgba(255, 215, 0, 1)",
          "rgba(50, 205, 50, 1)",
          "rgba(0, 128, 0, 1)",
          "rgba(0, 0, 255, 1)",
          "rgba(128, 0, 128, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const containerDashboard = {
    height: "240px",
    "@media (max-width: 605px)": {
      height: "400px",
    },
    width: "100%",
    alignItems: "center",
    marginBottom: "0.75rem",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 10,
    paddingBottom: 0,
  };
  const statsGridStyles = {
    width: "33%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  return (
    <Container sx={containerDashboard}>
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        paddingTop="0.5rem"
        boxShadow="5px"
      >
        DASHBOARD
      </Typography>
      <Grid container spacing={1} sx={{ height: "75%" }}>
        <Grid item xs={12} sm={6} xl={6} sx={statsGridStyles}>
          <Typography variant="subtitle1" gutterBottom>
            Total de Pokemons: {allPokemons.length}
          </Typography>
          <Grid>
            <Typography gutterBottom variant="caption" component="div">
              M??dia ataque: {averageAttack.toFixed(2)}
              <LinearProgress
                variant="determinate"
                value={Number(averageAttack.toFixed(2))}
                valueBuffer={150}
                style={{ height: 10 }}
                color="error"
              />
            </Typography>
            <Typography gutterBottom variant="caption" component="div">
              M??dia defesa: {averageDefense.toFixed(2)}
              <LinearProgress
                variant="determinate"
                value={Number(averageDefense.toFixed(2))}
                valueBuffer={150}
                style={{ height: 10 }}
                color="info"
              />
            </Typography>
            <Typography gutterBottom variant="caption" component="div">
              M??dia velocidade: {averageSpeed.toFixed(2)}
              <LinearProgress
                variant="determinate"
                value={Number(averageSpeed.toFixed(2))}
                valueBuffer={150}
                style={{ height: 10 }}
                color="success"
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          xl={6}
          alignItems="center"
          sx={{
            width: "65%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="subtitle1">
            Quantidade de Pokemons por tipo:
          </Typography>
          <Container
            disableGutters
            sx={{
              height: "125px",
              padding: "0px",
              margin: "0px",
            }}
          >
            <Bar
              data={data}
              width={"100%"}
              height={"100%"}
              options={{
                scales: { x: { ticks: { font: { size: 7 } } } },
                plugins: {
                  legend: {
                    display: false,
                  },
                  datalabels: {
                    anchor: "end",
                    align: "end",
                    labels: {
                      data: { font: { size: 6 } },
                      title: { font: { size: 6 } },
                    },
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};
